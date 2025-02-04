package org.example.movita_backend.persistence.impl;

import org.example.movita_backend.model.Booking;
import org.example.movita_backend.model.Category;
import org.example.movita_backend.model.Event;
import org.example.movita_backend.model.ResultSetMapper;
import org.example.movita_backend.model.dto.EventFilter;
import org.example.movita_backend.persistence.DBManager;
import org.example.movita_backend.persistence.dao.EventDao;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;



@Component
public class EventDaoJDBC implements EventDao {
    private final Connection connection;

    public EventDaoJDBC(){
        this.connection = DBManager.getInstance().getConnection();
    }
    @Override
    public void create(Event event) {
        String query = "INSERT INTO evento " +
                "(nome,data,prezzo,citta,indirizzo,num_partecipanti,max_num_partecipanti,eta_minima,descrizione,valutazione_media,creatore)" +
                "VALUES " +
                "(?,?,?,?,?,?,?,?,?,?,?)";

        try(PreparedStatement ps = connection.prepareStatement(query)){
            ps.setString(1, event.getNome());
            ps.setString(2, event.getData());
            ps.setFloat(3,event.getPrezzo());
            ps.setString(4, event.getCitta());
            ps.setString(5, event.getIndirizzo());
            ps.setInt(6, event.getNumPartecipanti());
            ps.setInt(7, event.getMaxNumPartecipanti());
            ps.setInt(8, event.getEtaMinima());
            ps.setString(9, event.getDescrizione());
            ps.setFloat(10, event.getValutazioneMedia());
            ps.setInt(11, event.getCreatore().getId());

            ps.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Couldn't create event.");
        }
    }

    @Override
    public Event findById(int id) {
        String query = "SELECT * FROM evento WHERE id = ?";
        List<Event> toRet = new ArrayList<>();

        try(PreparedStatement ps = connection.prepareStatement(query)){
            ps.setInt(1,id);
            ResultSet rs = ps.executeQuery();
            if(rs.next()){
                return ResultSetMapper.mapEvent(rs);
            }
            return null;
        }catch (SQLException e){
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public List<Event> findAll() {
        String query = "SELECT * FROM evento";
        List<Event> toRet = new ArrayList<>();

        try(PreparedStatement ps = connection.prepareStatement(query)){
            ResultSet rs = ps.executeQuery();
            while(rs.next()){
                Event e = ResultSetMapper.mapEvent(rs);
                toRet.add(e);
            }
            return toRet;
        }catch (SQLException e){
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public Event update(Event event) {
        String query = "UPDATE evento SET " +
                "nome=?,data=?,prezzo=?, citta=?, indirizzo=?,max_num_partecipanti=?,eta_minima=?,descrizione=? "+
                "WHERE id=?";

        try(PreparedStatement ps = connection.prepareStatement(query)){
            ps.setString(1, event.getNome());
            ps.setString(2, event.getData());
            ps.setString(3, event.getCitta());
            ps.setString(4, event.getIndirizzo());
            ps.setInt(5, event.getMaxNumPartecipanti());
            ps.setInt(6, event.getEtaMinima());
            ps.setString(7, event.getDescrizione());

            ps.executeUpdate();
        }catch(SQLException e){
            e.printStackTrace();
            throw new UsernameNotFoundException("Could not update user.");
        }

        return findById(event.getId());
    }



    @Override
    public List<Event> findByFilter(EventFilter filter) {
        StringBuilder query = new StringBuilder("SELECT * FROM evento e WHERE 1=1 ");
        List<Object> parameters = new ArrayList<>();

        if (filter.getCreatore_id() > 0) {
            query.append(" AND e.creatore LIKE ? ");
            parameters.add("%"+filter.getCreatore_id()+"%");
        }
        if (filter.getCitta() != null && !filter.getCitta().isEmpty()) {
            query.append(" AND e.citta LIKE ? ");
            parameters.add("%"+filter.getCitta()+"%");
        }
        if (filter.getEtaMinima() > 0) {
            query.append(" AND e.eta_minima >= ? ");
            parameters.add(filter.getEtaMinima());
        }
        if (filter.getPrezzoMassimo() > 0) {
            query.append(" AND e.prezzo <= ? ");
            parameters.add(filter.getPrezzoMassimo());
        }
        if (filter.getValutazioneMedia() > 0) {
            query.append(" AND e.valutazione_media >= ? ");
            parameters.add(filter.getValutazioneMedia());
        }
        if (filter.isAlmenoMetaPartecipanti()) {
            query.append(" AND e.num_partecipanti >= e.max_num_partecipanti / 2 ");
        }
        if (filter.getCategorie_id() != null && !filter.getCategorie_id().isEmpty()) {
            //questa stringa mette un punto interrogativo nella query per ogni id_categoria presente.
            String inClause = String.join(",", filter.getCategorie_id().stream().map(id -> "?").toArray(String[]::new));
            query.append(" AND e.id IN (SELECT ec.id_evento as id FROM evento_categoria ec WHERE ec.id_categoria IN (" + inClause + ")) ");
            parameters.addAll(filter.getCategorie_id());
        }

        try (PreparedStatement stmt = connection.prepareStatement(query.toString())) {
            for (int i = 0; i < parameters.size(); i++) {
                stmt.setObject(i + 1, parameters.get(i));
            }

            ResultSet rs = stmt.executeQuery();
            List<Event> eventi = new ArrayList<>();

            while (rs.next()) {
                eventi.add(ResultSetMapper.mapEvent(rs));
            }
            return eventi;
        }catch (SQLException e){
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public String findDescrizione(Event evento) {
        String query = "SELECT descrizione FROM evento WHERE id = ?";
        String toRet = "";

        try(PreparedStatement ps = connection.prepareStatement(query)){
            ps.setInt(1, evento.getId());
            ResultSet rs = ps.executeQuery();

            if(rs.next()){
                toRet = rs.getString("descrizione");
            }
            return  toRet;
        }catch (SQLException e){
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public List<Category> findCategories(Event event) {
        List<Category> categorie = new ArrayList<>();
        String query = "SELECT c.* FROM categoria c " +
                "JOIN evento_categoria ec ON c.id = ec.id_categoria " +
                "WHERE ec.id_evento = ?";

        try(PreparedStatement ps = connection.prepareStatement(query)){
            ps.setInt(1, event.getId());
            ResultSet rs = ps.executeQuery();
                while (rs.next()) {
                    Category category = new Category();
                    category.setId(rs.getInt(1));
                    category.setNome(rs.getString(2));
                    category.setDescrizione(rs.getString(3));
                    categorie.add(category);
                }
            return categorie;
        }
        catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }

    //FIXME: USA mapEvent
    public int save(Event event) {

        String query = "INSERT INTO evento (nome, data, prezzo, citta, indirizzo, num_partecipanti, max_num_partecipanti, eta_minima, descrizione, valutazione_media, creatore) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?); ";

        try (PreparedStatement statement = connection.prepareStatement(query, PreparedStatement.RETURN_GENERATED_KEYS)) {
            statement.setString(1, event.getNome());
            statement.setTimestamp(2, java.sql.Timestamp.valueOf(event.getData()));
            statement.setFloat(3, event.getPrezzo());
            statement.setString(4, event.getCitta());
            statement.setString(5, event.getIndirizzo());
            statement.setInt(6, event.getNumPartecipanti());
            statement.setInt(7, event.getMaxNumPartecipanti());
            statement.setInt(8, event.getEtaMinima());
            statement.setString(9, event.getDescrizione());
            statement.setFloat(10, event.getValutazioneMedia());
            statement.setInt(11, event.getCreatore().getId());

            statement.executeUpdate();

            // Recupera la chiave primaria generata
            try (ResultSet generatedPrimaryKey = statement.getGeneratedKeys()) {
                int generatedId = -1;
                if (generatedPrimaryKey.next()) {
                    generatedId = generatedPrimaryKey.getInt(1);
                }
                return generatedId;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return -1; // In caso di errore restituisci -1
        }
    }

    @Override
    public void delete(int eventId) {
        String query = "DELETE FROM evento WHERE id = ?";

        try (PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setInt(1, eventId);
            int rowsAffected = ps.executeUpdate();

            if (rowsAffected == 0) {
                throw new RuntimeException("No event found with the specified ID.");
            }
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException("Error occurred while trying to delete the event: " + e.getMessage());
        }
    }
}
