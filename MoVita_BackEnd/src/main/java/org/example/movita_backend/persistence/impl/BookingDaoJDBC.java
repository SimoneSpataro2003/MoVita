package org.example.movita_backend.persistence.impl;

import org.example.movita_backend.model.Booking;
import org.example.movita_backend.model.Event;
import org.example.movita_backend.model.ResultSetMapper;
import org.example.movita_backend.model.User;
import org.example.movita_backend.persistence.DBManager;
import org.example.movita_backend.persistence.dao.BookingDao;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.stereotype.Component;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;


@Component
public class BookingDaoJDBC implements BookingDao {

    // Memo Giuseppe da provare
    private final Connection connection;


    public BookingDaoJDBC(){
        this.connection = DBManager.getInstance().getConnection();
    }


    @Override
    public List<Booking> findAll() {
        String query = "SELECT * FROM partecipazione";
        List<Booking> valuteToReturn = new ArrayList<>();

        try(PreparedStatement ps = connection.prepareStatement(query)){
            ResultSet rs = ps.executeQuery();
            while(rs.next()){
                Booking booking = ResultSetMapper.mapBooking(rs);
                valuteToReturn.add(booking);
            }
            return valuteToReturn;
        }catch (SQLException e){
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public List<Booking> findByEvent(Event event) {
        String query = "SELECT * FROM partecipazione WHERE id_evento=?";
        List<Booking> valuteToReturn = new ArrayList<>();

        try(PreparedStatement ps = connection.prepareStatement(query)){
            ps.setInt(1, event.getId());
            ResultSet rs = ps.executeQuery();
            while(rs.next()){
                Booking booking = ResultSetMapper.mapBooking(rs);
                valuteToReturn.add(booking);
            }
            return valuteToReturn;
        }catch (SQLException e){
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public List<Booking> findByUser(User user) {
        String query = "SELECT * FROM partecipazione WHERE id_utente=?";
        List<Booking> valuteToReturn = new ArrayList<>();

        try(PreparedStatement ps = connection.prepareStatement(query)){
            ps.setInt(1, user.getId());
            ResultSet rs = ps.executeQuery();
            while(rs.next()){
                Booking booking = ResultSetMapper.mapBooking(rs);
                valuteToReturn.add(booking);
            }
            return valuteToReturn;
        }catch (SQLException e){
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public List<Booking> findEventsById(int id) {
        String query = "SELECT * FROM partecipazione WHERE id_utente=?";
        List<Booking> valuteToReturn = new ArrayList<>();

        try(PreparedStatement ps = connection.prepareStatement(query)){
            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();
            while(rs.next()){
                valuteToReturn.add(ResultSetMapper.mapBooking(rs));
            }
            return valuteToReturn;
        }catch (SQLException e){
            throw new RuntimeException(e.getMessage());
        }
    }


    @Override
    public Booking findById(User utente, Event evento) {
        String query = "SELECT * FROM partecipazione WHERE id_utente = ? and id_evento = ?";
        List<Event> valuteToReturn = new ArrayList<>();

        try(PreparedStatement ps = connection.prepareStatement(query)){
            ps.setInt(1,utente.getId());
            ps.setInt(2,evento.getId());
            ResultSet rs = ps.executeQuery();
            if(rs.next()){
                return ResultSetMapper.mapBooking(rs);
            }
            return null;
        }catch (SQLException e){
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }


    @Override
    public Booking update(Booking booking) {
        String query = "UPDATE partecipazione SET " +
                "id_utente=?,id_evento=?,data=?, annullata=?"+
                "WHERE id_utente = ? and id_evento = ?";

        try(PreparedStatement ps = connection.prepareStatement(query)){
            ps.setInt(1, booking.getUtente().getId());
            ps.setInt(2, booking.getEvento().getId());
            ps.setTimestamp(3,java.sql.Timestamp.valueOf(booking.getData()));
            ps.setBoolean(4, booking.getAnnullata());
            ps.executeUpdate();
        }catch(SQLException e){
            e.printStackTrace();
            throw new UsernameNotFoundException("Could not update booking.");
        }

        return findById(booking.getUtente(), booking.getEvento());
    }

    @Override
    public void save(Booking booking) {
        String query = "INSERT INTO partecipazione (id_utente, id_evento, data, annullata) " +
                "VALUES (?, ?, ?, ?); ";

        try (PreparedStatement statement = connection.prepareStatement(query, PreparedStatement.RETURN_GENERATED_KEYS)) {
            statement.setInt(1, booking.getUtente().getId());
            statement.setInt(2, booking.getEvento().getId());
            statement.setTimestamp(3, java.sql.Timestamp.valueOf(booking.getData()));
            statement.setBoolean(4, booking.getAnnullata());

            statement.executeUpdate();

        } catch (Exception e) {
            e.printStackTrace();

        }
    }

}
