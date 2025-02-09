package org.example.movita_backend.persistence.impl;

import org.example.movita_backend.model.ResultSetMapper;
import org.example.movita_backend.persistence.DBManager;
import org.example.movita_backend.persistence.dao.PaymentDAO;
import org.example.movita_backend.model.Payment;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Repository
public class PaymentDaoJDBC implements PaymentDAO
{
    private final Connection connection;

    public PaymentDaoJDBC()
    {
        connection = DBManager.getInstance().getConnection();
    }

    @Override
    public void addPayment(Payment payment) {
        String query = "INSERT INTO pagamento (titolo, ammontare, data, id_utente) VALUES (?, ?, ?, ?)";

        try (PreparedStatement preparedStatement = connection.prepareStatement(query))
        {
            preparedStatement.setString(1, payment.getTitolo());
            preparedStatement.setDouble(2, payment.getAmmontare());
            preparedStatement.setDate(3, java.sql.Date.valueOf(payment.getData()));
            preparedStatement.setInt(4, payment.getId_utente());
            preparedStatement.executeUpdate();
        }
        catch (SQLException e)
        {
            throw new RuntimeException("Errore durante l'aggiunta del pagamento al database", e);
        }
    }

    @Override
    public List<Payment> getAllPayments()
    {
        String query = "SELECT * FROM pagamento ORDER BY id_utente";
        List<Payment> toRet = new ArrayList<>();

        try (PreparedStatement ps = connection.prepareStatement(query))
        {
            ResultSet rs = ps.executeQuery();

            while (rs.next())
            {
                Payment u = mapPayment(rs);
                toRet.add(u);
            }
            return toRet;
        }
        catch (SQLException e)
        {
            throw new RuntimeException("Couldn't show all payments", e);
        }
    }

    @Override
    public List<Payment> getPaymentsById(int id) {
        String query = "SELECT * FROM pagamento WHERE id_utente = ?";
        List<Payment> toRet = new ArrayList<>();

        try (PreparedStatement ps = connection.prepareStatement(query))
        {
            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();

            while (rs.next())
            {
                Payment u = mapPayment(rs);
                toRet.add(u);
            }
            return toRet;
        }
        catch (SQLException e)
        {
            throw new RuntimeException("Couldn't find payments for the user with ID: " + id, e);
        }
    }

    private Payment mapPayment(ResultSet rs) throws SQLException
    {
        return ResultSetMapper.mapPayment(rs);
    }
}
