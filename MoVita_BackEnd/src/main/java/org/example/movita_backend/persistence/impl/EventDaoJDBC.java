package org.example.movita_backend.persistence.impl;

import org.example.movita_backend.model.Category;
import org.example.movita_backend.model.Event;
import org.example.movita_backend.model.User;
import org.example.movita_backend.persistence.DBManager;
import org.example.movita_backend.persistence.dao.EventDao;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

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
    }

    private Event mapEvent(ResultSet rs) throws SQLException {
        Event e = new Event();

        e.setId(rs.getInt("id"));
        e.setNome(rs.getString("nome"));
        e.setData(rs.getString("data")); // Considera se usare un tipo come LocalDate o Timestamp
        e.setPrezzo(rs.getFloat("prezzo"));
        e.setCitta(rs.getString("citta"));
        e.setIndirizzo(rs.getString("indirizzo"));
        e.setNumPartecipanti(rs.getInt("numPartecipanti"));
        e.setMaxNumPartecipanti(rs.getInt("maxNumPartecipanti"));
        e.setEtaMinima(rs.getByte("etaMinima"));
        //e.setDescrizione(rs.getString("descrizione")); //NO: effettuata con un proxy.
        e.setValutazioneMedia(rs.getFloat("valutazioneMedia"));
        e.setCreatore(DBManager.getInstance().getUserDAO().findById(rs.getInt("creatore")));

        return e;
    }

}
