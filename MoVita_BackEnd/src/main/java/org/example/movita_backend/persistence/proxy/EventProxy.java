package org.example.movita_backend.persistence.proxy;

import org.example.movita_backend.model.*;
import org.example.movita_backend.persistence.DBManager;
import org.example.movita_backend.persistence.dao.EventDao;

import java.sql.Connection;
import java.util.List;

public class EventProxy extends Event {

    public EventProxy(Event event) {
        this.id = event.getId();
        this.nome = event.getNome();
        this.data = event.getData();
        this.prezzo = event.getPrezzo();
        this.citta=event.getCitta();
        this.indirizzo=event.getIndirizzo();
        this.numPartecipanti=event.getNumPartecipanti();
        this.maxNumPartecipanti=event.getMaxNumPartecipanti();
        this.etaMinima=event.getEtaMinima();
    }


    @Override
    public List<Category> getCategorie(){
        if(this.categorie==null){
            this.categorie = DBManager.getInstance().getEventDAO().findCategories(this);
        }
        return categorie;
    }

    @Override
    public String getDescrizione(){
        if(this.descrizione==null){
            this.descrizione = DBManager.getInstance().getEventDAO().findDescrizione(this);
        }
        return descrizione;
    }

    @Override
    public List<Booking> getPrenotazioni(){
        if(this.prenotazioni==null){
            this.prenotazioni= DBManager.getInstance().getBookingDAO().findByEvent(this);
        }
        return this.prenotazioni;

    }

    @Override
    public List<Review> getRecensioni()
    {
        if(this.recensioni==null){
            this.recensioni= DBManager.getInstance().getReviewDAO().findByEvent(this);
        }
        return this.recensioni;
    }

}
