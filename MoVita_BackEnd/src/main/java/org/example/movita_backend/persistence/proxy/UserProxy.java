package org.example.movita_backend.persistence.proxy;

import org.example.movita_backend.model.Event;
import org.example.movita_backend.model.Payment;
import org.example.movita_backend.model.ResultSetMapper;
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
    public UserProxy() {
        this.connection = DBManager.getInstance().getConnection();
    }

    public List<User> getAmici(int userId) {
        if (amici != null) {
            System.out.println("Uso il proxy per recuperare gli amici");
            return amici;
        }
        return DBManager.getInstance().getUserDAO().findFriends(userId);
    }

    public List<Payment> getPayments(int userId) {
        if (super.pagamenti != null) {
            return super.pagamenti;
        }

        String query = "SELECT * FROM pagamento WHERE pagamento.id_utente = ? ORDER BY data";
        List<Payment> payments = new ArrayList<>();

        try (PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setInt(1, userId);
            ResultSet rs = ps.executeQuery();

            while (rs.next()) {
                payments.add(mapPayment(rs));
            }

            this.pagamenti = payments;
            return this.pagamenti;
        } catch (SQLException e) {
            throw new RuntimeException("Errore nel recupero dei pagamenti dal database", e);
        }
    }

    public List<User> searchFriendsWithFilter(String filter) {
        if (super.utentiCercati == null) {
            System.out.println("Uso il proxy per recuperare gli amici con il filtro");
            this.utentiCercati = DBManager.getInstance().getUserDAO().findUserByUsername(filter);
        }
        System.out.println("Non uso il proxy per recuperare gli amici con il filtro");
        return super.utentiCercati;
    }

    public List<Event> getCreatedEvents(int userId) {
        if(super.eventiCreati == null) {
            this.eventiCreati = DBManager.getInstance().getUserDAO().getCreatedEventsByUserId(userId);
        }
        return super.eventiCreati;
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
        payment.setId(rs.getInt("id"));
        payment.setTitolo(rs.getString("titolo"));
        payment.setAmmontare(rs.getInt("ammontare"));
        payment.setData(rs.getString("data"));
        payment.setId_utente(rs.getInt("id_utente"));
        return payment;
    }
}
