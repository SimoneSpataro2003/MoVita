package org.example.movita_backend.persistence.impl;

import org.example.movita_backend.persistence.dao.PaymentDAO;
import org.example.movita_backend.model.Payment;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class PaymentDaoJDBC implements PaymentDAO {
    Connection connection;

    public PaymentDaoJDBC(Connection connection) {
        this.connection = connection;
    }

    @Override
    public List<Payment> getPaymentsByUserId(int userId) {
        List<Payment> payments = new ArrayList<>();
        String query= "SELECT * FROM pagamento WHERE id_utente = ?";

        try (PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setLong(1, userId);

            try (ResultSet rs = preparedStatement.executeQuery()) {
                while (rs.next()) {
                    payments.add(mapEntity(rs));
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException("Errore nel recupero dei pagamenti dal database", e);
        }
        return payments;
    }

    private Payment mapEntity(ResultSet rs) throws SQLException {
        Payment payment = new Payment();

        payment.setId(rs.getInt("id"));
        payment.setAmmontare(rs.getShort("ammontare"));
        payment.setData(rs.getString("data"));
        payment.setId_utente(rs.getInt("id_utente"));

        return payment;
    }
}
