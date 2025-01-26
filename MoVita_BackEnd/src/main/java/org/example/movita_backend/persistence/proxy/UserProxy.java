package org.example.movita_backend.persistence.proxy;

import org.example.movita_backend.model.Payment;
import org.example.movita_backend.model.User;
import org.example.movita_backend.persistence.DBManager;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class UserProxy extends User {
    private final Connection connection;

    public UserProxy(User user) {
        super(user); // Chiama il costruttore della classe base User
        this.connection = DBManager.getInstance().getConnection();
    }

    @Override
    public List<User> getAmici() {
        if (super.amici != null) {
            return super.amici;
        }

        String query = "SELECT * FROM amicizia a, utente u WHERE u.id = a.id_utente2 AND id_utente1 = ?";
        List<User> friends = new ArrayList<>();

        try (PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setLong(1, this.getId());
            ResultSet rs = preparedStatement.executeQuery();

            while (rs.next()) {
                friends.add(mapUser(rs));
            }

            this.amici = friends;
            return friends;
        } catch (SQLException e) {
            throw new RuntimeException("Errore nel recupero degli amici dal database", e);
        }
    }

    public List<Payment> getPayments(int userId) {
        if (super.pagamenti != null) {
            return super.pagamenti;
        }

        String query = "SELECT * FROM pagamento WHERE pagamento.id_utente = ? ORDER BY data";
        List<Payment> payments = new ArrayList<>();

        try (PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setInt(1, userId);
            ResultSet rs = preparedStatement.executeQuery();

            while (rs.next()) {
                payments.add(mapPayment(rs));
            }

            this.pagamenti = payments;
            return payments;
        } catch (SQLException e) {
            throw new RuntimeException("Errore nel recupero dei pagamenti dal database", e);
        }
    }

    private User mapUser(ResultSet rs) throws SQLException {
        User user = new User();
        user.setId(rs.getInt("id"));
        user.setEmail(rs.getString("email"));
        user.setPassword(rs.getString("password"));
        user.setNome(rs.getString("nome"));
        user.setImmagineProfilo(rs.getString("immagine_profilo"));
        user.setCitta(rs.getString("citta"));
        user.setAzienda(rs.getBoolean("azienda"));
        user.setPersonaCognome(rs.getString("persona_cognome"));
        user.setAziendaPartitaIva(rs.getString("azienda_p_iva"));
        user.setAziendaIndirizzo(rs.getString("azienda_indirizzo"));
        user.setAziendaRecapito(rs.getString("azienda_recapito"));
        user.setPremium(rs.getBoolean("premium"));
        user.setPremiumDataInizio(rs.getString("premium_data_inizio"));
        user.setPremiumDataFine(rs.getString("premium_data_fine"));
        user.setAdmin(rs.getBoolean("admin"));
        user.setDataCreazione(rs.getString("data_creazione"));
        user.setDataUltimaModifica(rs.getString("data_ultima_modifica"));
        user.setMostraConsigliEventi(rs.getBoolean("mostra_consigli_eventi"));
        return user;
    }

    private Payment mapPayment(ResultSet rs) throws SQLException {
        Payment payment = new Payment();
        payment.setId(rs.getInt("id_pagamento"));
        payment.setTitolo(rs.getString("titolo_pagamento"));
        payment.setAmmontare(rs.getInt("ammontare"));
        payment.setId_utente(rs.getInt("id_utente"));
        payment.setData(rs.getString("data"));
        return payment;
    }
}
