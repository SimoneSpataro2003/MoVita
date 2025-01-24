package org.example.movita_backend.persistence.impl;

import org.example.movita_backend.persistence.DBManager;
import org.example.movita_backend.persistence.dao.PaymentDAO;
import org.example.movita_backend.model.Payment;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class PaymentDaoJDBC implements PaymentDAO
{
    private final Connection connection;

    public PaymentDaoJDBC()
    {
        connection = DBManager.getInstance().getConnection();
    }

    @Override
    public void addPayment(Payment payment) {
        String query = "INSERT INTO pagamento (titolo_pagamento, ammontare, data, id_utente) VALUES (?, ?, ?, ?)";

        try (PreparedStatement preparedStatement = connection.prepareStatement(query))
        {
            preparedStatement.setString(1, payment.getTitolo());
            preparedStatement.setFloat(2, payment.getAmmontare());
            preparedStatement.setString(3, payment.getData());
            preparedStatement.setInt(4, payment.getId_utente());
            preparedStatement.executeUpdate();
        }
        catch (SQLException e)
        {
            throw new RuntimeException("Errore durante l'aggiunta del pagamento al database", e);
        }
    }

    @Override
    public void clearAllPayments()
    {
        String query = "DELETE FROM pagamento";

        try (PreparedStatement preparedStatement = connection.prepareStatement(query))
        {
            preparedStatement.executeUpdate();
        }
        catch (SQLException e)
        {
            throw new RuntimeException("Errore durante la cancellazione di tutti i pagamenti", e);
        }
    }

    private Payment mapEntity(ResultSet rs) throws SQLException
    {
        Payment payment = new Payment();
        payment.setId(rs.getInt("id_pagamento"));
        payment.setTitolo(rs.getString("titolo_pagamento"));
        payment.setAmmontare(rs.getShort("ammontare"));
        payment.setData(rs.getString("data"));
        payment.setId_utente(rs.getInt("id_utente"));
        return payment;
    }
}
