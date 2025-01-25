package org.example.movita_backend.persistence.proxy;

import org.example.movita_backend.model.Payment;
import org.example.movita_backend.model.User;

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

    //TODO: ALTRI PROXY!
    public List<User> getUsersByUsername(String username)
    {
        if (super.utentiCercati != null)
        {
            return super.utentiCercati;
        }

        String query = "SELECT * FROM utente WHERE utente.username LIKE CONCAT('%', ?, '%');";
        List<User> users = new ArrayList<>();

        try (PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            preparedStatement.setString(1, username);

            ResultSet rs = preparedStatement.executeQuery();

            while (rs.next()) {
                users.add(mapUser(rs));
            }

            this.utentiCercati = users;
            return utentiCercati;
        } catch (SQLException e) {
            throw new RuntimeException("Errore nel recupero degli utenti cercati dal database", e);
        }
    }

    public List<Payment> getPayments()
    {
        if (super.pagamenti != null)
        {
            return super.pagamenti;
        }

        String query = "SELECT * FROM pagamento WHERE pagamento.id_utente = ? ORDER BY data";
        List<Payment> pagamenti = new ArrayList<>();

        try (PreparedStatement preparedStatement = connection.prepareStatement(query))
        {
            preparedStatement.setLong(1, this.getId());

            ResultSet rs = preparedStatement.executeQuery();

            while (rs.next()) {
                pagamenti.add(mapPayment(rs));
            }

            this.pagamenti = pagamenti;
            return pagamenti;
        }
        catch (SQLException e)
        {
            throw new RuntimeException("Errore nel recupero dei pagamenti dal database", e);
        }
    }

    private User mapUser(ResultSet rs) throws SQLException {
        User u = new User();

        u.setId(rs.getInt("id"));
        u.setEmail(rs.getString("email"));
        u.setPassword(rs.getString("password"));
        u.setNome(rs.getString("nome"));
        u.setImmagineProfilo(rs.getString("immagine_profilo"));
        u.setCitta(rs.getString("citta"));
        u.setAzienda(rs.getBoolean("azienda"));
        u.setPersonaCognome(rs.getString("persona_cognome"));
        u.setAziendaPartitaIva(rs.getString("azienda_p_iva"));
        u.setAziendaIndirizzo(rs.getString("azienda_indirizzo"));
        u.setAziendaRecapito(rs.getString("azienda_recapito"));
        u.setPremium(rs.getBoolean("premium"));
        u.setPremiumDataInizio(rs.getString("premium_data_inizio"));
        u.setPremiumDataFine(rs.getString("premium_data_fine"));
        u.setAdmin(rs.getBoolean("admin"));
        u.setDataCreazione(rs.getString("data_creazione"));
        u.setDataUltimaModifica(rs.getString("data_ultima_modifica"));
        u.setMostraConsigliEventi(rs.getBoolean("mostra_consigli_eventi"));

        return u;
    }

    private Payment mapPayment(ResultSet rs) throws SQLException {
        Payment p = new Payment();

        p.setId(rs.getInt("id_pagamento"));
        p.setTitolo(rs.getString("titolo_pagamento"));
        p.setAmmontare(rs.getInt("ammontare"));
        p.setId_utente(rs.getInt("id_utente"));
        p.setData(rs.getString("data"));

        return p;
    }
}
