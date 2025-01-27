package org.example.movita_backend.persistence.impl;

import org.example.movita_backend.model.Booking;
import org.example.movita_backend.model.Category;
import org.example.movita_backend.model.Event;
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
                return mapEvent(rs);
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
                Event e = mapEvent(rs);
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
    public List<Event> findByFilter(String filter) {
        String query = "SELECT e.* FROM evento e WHERE nome LIKE ?";
        List<Event> toRet = new ArrayList<>();

        try(PreparedStatement ps = connection.prepareStatement(query)){
            ps.setString(1, "%"+filter+"%");
            ResultSet rs = ps.executeQuery();

            while(rs.next()){
                Event e = mapEvent(rs);
                toRet.add(e);
            }
            return toRet;
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
    public List<Category> findCategories(int id) {
        //TODO: REALIZZA CATEGORIE
        //TODO: REALIZZA PROXY EVENTO
        return List.of();
    }

    private Event mapEvent(ResultSet rs) throws SQLException {
        Event e = new Event();

        e.setId(rs.getInt("id"));
        e.setNome(rs.getString("nome"));
        e.setData(rs.getString("data")); // Considera se usare un tipo come LocalDate o Timestamp
        e.setPrezzo(rs.getFloat("prezzo"));
        e.setCitta(rs.getString("citta"));
        e.setIndirizzo(rs.getString("indirizzo"));
        e.setNumPartecipanti(rs.getInt("num_partecipanti"));
        e.setMaxNumPartecipanti(rs.getInt("max_num_partecipanti"));
        e.setEtaMinima(rs.getByte("eta_minima"));
        //e.setDescrizione(rs.getString("descrizione")); //NO: effettuata con un proxy.
        e.setValutazioneMedia(rs.getFloat("valutazione_media"));
        e.setCreatore(DBManager.getInstance().getUserDAO().findById(rs.getInt("creatore")));

        return e;
    }

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
