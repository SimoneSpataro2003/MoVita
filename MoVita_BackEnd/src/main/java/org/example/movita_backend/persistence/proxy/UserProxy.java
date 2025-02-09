package org.example.movita_backend.persistence.proxy;

import org.example.movita_backend.model.*;
import org.example.movita_backend.persistence.DBManager;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class UserProxy extends User {
    private final Connection connection = DBManager.getInstance().getConnection();
    public UserProxy(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.password = user.getPassword();
        this.nome = user.getNome();
        this.immagineProfilo = user.getImmagineProfilo();
        this.citta = user.getCitta();
        this.azienda = user.isAzienda();
        this.personaCognome = user.getPersonaCognome();
        this.aziendaPartitaIva = user.getAziendaPartitaIva();
        this.aziendaIndirizzo = user.getAziendaIndirizzo();
        this.aziendaRecapito = user.getAziendaRecapito();
        this.premium = user.isPremium();
        this.premiumDataInizio = user.getPremiumDataInizio();
        this.premiumDataFine = user.getPremiumDataFine();
        this.dataCreazione = user.getDataCreazione();
        this.dataUltimaModifica = user.getDataUltimaModifica();
        this.mostraConsigliEventi = user.isMostraConsigliEventi();
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

    @Override
    public List<Category> getCategorieInteressate(){
        this.categorieInteressate = DBManager.getInstance().getUserDAO().findCategories(this);
        return categorieInteressate;
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
