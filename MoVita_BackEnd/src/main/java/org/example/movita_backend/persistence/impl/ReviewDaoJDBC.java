package org.example.movita_backend.persistence.impl;

import org.example.movita_backend.model.Booking;
import org.example.movita_backend.model.Event;
import org.example.movita_backend.model.Review;
import org.example.movita_backend.model.User;
import org.example.movita_backend.persistence.DBManager;
import org.example.movita_backend.persistence.dao.ReviewDao;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Component
public class ReviewDaoJDBC implements ReviewDao {


    private final Connection connection;

    public ReviewDaoJDBC(){
        this.connection = DBManager.getInstance().getConnection();
    }

    // Memo Giuseppe da provare

    @Override
    public List<Review> findAll() {
        String query = "SELECT * FROM recensione";
        List<Review> valuteToReturn = new ArrayList<>();

        try(PreparedStatement ps = connection.prepareStatement(query)){
            ResultSet rs = ps.executeQuery();
            while(rs.next()){
                Review review = mapReview(rs);
                valuteToReturn.add(review);
            }
            return valuteToReturn;
        }catch (SQLException e){
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }

    private Review mapReview(ResultSet rs) throws SQLException {
        Review review = new Review();
        review.setUtente(DBManager.getInstance().getUserDAO().findById(rs.getInt(1)));
        review.setEvento(DBManager.getInstance().getEventDAO().findById(rs.getInt(2)));
        review.setTitolo(rs.getString(3));
        review.setDescrizione(rs.getString(4));
        review.setValutazione(rs.getByte(5));
        review.setDate(rs.getDate(6).toString());
        return review;
    }

    @Override
    public Review findById(User user, Event event) {
        String query = "SELECT * FROM recensione WHERE id_utente = ? and id_evento = ?";
        List<Event> valuteToReturn = new ArrayList<>();

        try(PreparedStatement ps = connection.prepareStatement(query)){
            ps.setInt(1,user.getId());
            ps.setInt(2,event.getId());
            ResultSet rs = ps.executeQuery();
            if(rs.next()){
                return mapReview(rs);
            }
            return null;
        }catch (SQLException e){
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public List<Review> findByEvent(Event event) {
        String query = "SELECT * FROM recensione WHERE id_evento = ?";
        List<Review> valuteToReturn = new ArrayList<>();

        try(PreparedStatement ps = connection.prepareStatement(query)){
            ps.setInt(1,event.getId());
            ResultSet rs = ps.executeQuery();
            while(rs.next()){
                Review review = mapReview(rs);
                valuteToReturn.add(review);
            }
            return valuteToReturn;
        }catch (SQLException e){
            e.printStackTrace();
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public Review update(Review review) {
        String query = "UPDATE recensione SET " +
                "id_utente=?,id_evento=?,titolo=?,descrizione=?,valutazione=?,data=?"+
                "WHERE id_utente = ? and id_evento = ?";

        try(PreparedStatement ps = connection.prepareStatement(query)){
            ps.setInt(1, review.getUtente().getId());
            ps.setInt(2, review.getEvento().getId());
            ps.setString(3, review.getTitolo());
            ps.setString(4, review.getDescrizione());
            ps.setByte(5, review.getValutazione());
            ps.executeUpdate();
        }catch(SQLException e){
            e.printStackTrace();
            throw new UsernameNotFoundException("Could not update booking.");
        }

        return findById(review.getUtente(), review.getEvento());
    }

    @Override
    public void save(Review review) {
        String query = "INSERT INTO recensione (id_utente, id_evento, data, annullata) " +
                "VALUES (?, ?, ?, ?); ";

        try (PreparedStatement statement = connection.prepareStatement(query, PreparedStatement.RETURN_GENERATED_KEYS)) {
            statement.setInt(1, review.getUtente().getId());
            statement.setInt(2, review.getEvento().getId());
            statement.setString(3, review.getTitolo());
            statement.setString(4, review.getDescrizione());
            statement.setByte(5, review.getValutazione());

            statement.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();

        }
    }

}
