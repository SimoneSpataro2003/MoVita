package org.example.movita_backend.persistence.imple;

import org.example.movita_backend.persistence.dao.UserDAO;
import org.example.movita_backend.model.User;
import org.example.movita_backend.persistence.proxy.UserProxy;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class UserDAOimpl implements UserDAO {
    private final Connection connection;

    public UserDAOimpl(Connection connection) {
        this.connection = connection;
    }

    @Override
    public User getUserById(int id) {
        String query = "SELECT * FROM utente WHERE id = ?";
        try (PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setInt(1, id);
            try (ResultSet resultSet = preparedStatement.executeQuery()) {
                if (resultSet.next()) {
                    return mapEntity(resultSet);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    private User mapEntity(ResultSet rs) throws SQLException {
        User user = new UserProxy(connection);

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

        return user;
    }
}
