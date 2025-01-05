package org.example.movita_backend.persistence.proxy;

import org.example.movita_backend.persistence.model.User;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class UserProxy extends User {
    Connection connection;

    public UserProxy(Connection connection) {
        this.connection = connection;
    }

    @Override
    public List<User> getFriends() {
        if (super.getFriends() != null) {
            return super.getFriends();
        }

        List<User> friends = new ArrayList<>();
        String query = "SELECT * " +
                "FROM utente u2, amicizia a " +
                "WHERE u2.id = a.id_utente2 AND a.id_utente1 = ? " +
                "ORDER BY a.id_utente2 DESC";

        try (PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setLong(1, this.getId());

            try (ResultSet rs = preparedStatement.executeQuery()) {
                while (rs.next()) {
                    User user = new User();

                    user.setId(rs.getInt("id"));
                    user.setTipo(rs.getShort("tipo"));
                    user.setVerificato(rs.getBoolean("verificato"));
                    user.setUsername(rs.getString("username"));
                    user.setPassword(rs.getString("password"));
                    user.setLuogo(rs.getString("luogo"));
                    user.setEmail(rs.getString("email"));
                    user.setCredito(rs.getInt("credito"));
                    user.setImmagineProfilo(rs.getObject("immagine_profilo", Short.class));
                    user.setEta(rs.getShort("eta"));
                    user.setValutazione(rs.getShort("valutazione"));

                    friends.add(user);
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException("Errore nel recupero degli amici dal database", e);
        }

        super.setFriends(friends);
        return friends;
    }
}
