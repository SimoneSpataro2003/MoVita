package org.example.movita_backend.model;

import org.example.movita_backend.persistence.DBManager;
import org.example.movita_backend.persistence.proxy.EventProxy;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ResultSetMapper {

    public static Booking mapBooking(ResultSet rs) throws SQLException {
        Booking booking = new Booking();
        booking.setUtente(DBManager.getInstance().getUserDAO().findById(rs.getInt(1)));
        booking.setEvento(DBManager.getInstance().getEventDAO().findById(rs.getInt(2)));
        booking.setData(rs.getString(3));
        booking.setAnnullata(rs.getBoolean(4));
        return booking;
    }

    public static Category mapCategory(ResultSet rs) throws SQLException {
        Category category = new Category();
        category.setId(rs.getInt("id"));
        category.setNome(rs.getString("nome"));
        category.setDescrizione(rs.getString("descrizione"));
        return category;
    }

    public static Event mapEvent(ResultSet rs) throws SQLException {
        Event e = new EventProxy();

        e.setId(rs.getInt("id"));
        e.setNome(rs.getString("nome"));
        e.setData(rs.getString("data")); // Considera se usare un tipo come LocalDate o Timestamp
        e.setPrezzo(rs.getFloat("prezzo"));
        e.setCitta(rs.getString("citta"));
        e.setIndirizzo(rs.getString("indirizzo"));
        e.setNumPartecipanti(rs.getInt("num_partecipanti"));
        e.setMaxNumPartecipanti(rs.getInt("max_num_partecipanti"));
        e.setEtaMinima(rs.getByte("eta_minima"));
        //e.setDescrizione(rs.getString("descrizione")); //NO: effettuata con un proxy.
        e.setValutazioneMedia(rs.getFloat("valutazione_media"));
        e.setCreatore(DBManager.getInstance().getUserDAO().findById(rs.getInt("creatore")));

        return e;
    }

    public static Payment mapPayment(ResultSet rs) throws SQLException
    {
        Payment payment = new Payment();
        payment.setId(rs.getInt("id_pagamento"));
        payment.setTitolo(rs.getString("titolo_pagamento"));
        payment.setAmmontare(rs.getShort("ammontare"));
        payment.setData(rs.getString("data"));
        payment.setId_utente(rs.getInt("id_utente"));
        return payment;
    }

    public static Review mapReview(ResultSet rs) throws SQLException {
        Review review = new Review();
        review.setUtente(DBManager.getInstance().getUserDAO().findById(rs.getInt(1)));
        review.setEvento(DBManager.getInstance().getEventDAO().findById(rs.getInt(2)));
        review.setTitolo(rs.getString(3));
        review.setDescrizione(rs.getString(4));
        review.setValutazione(rs.getByte(5));
        review.setDate(rs.getDate(6).toString());
        return review;
    }

    public static User mapUser(ResultSet rs) throws SQLException {
        User u = new User();

        u.setId(rs.getInt("id"));
        u.setUsername(rs.getString("username"));
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
}
