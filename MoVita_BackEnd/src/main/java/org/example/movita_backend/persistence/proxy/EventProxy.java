package org.example.movita_backend.persistence.proxy;

import org.example.movita_backend.model.*;
import org.example.movita_backend.persistence.DBManager;
import org.example.movita_backend.persistence.dao.EventDao;

import java.sql.Connection;
import java.util.List;

public class EventProxy extends Event {

    public List<Category> getCategory(){
        if(this.categorie==null){
            this.categorie = DBManager.getInstance().getEventDAO().findCategories(this);
        }
        return categorie;
    }

    public List<Booking> getPrenotazioni(){
        if(this.prenotazioni==null){
            this.prenotazioni= DBManager.getInstance().getBookingDAO().findByEvent(this);
        }
        return this.prenotazioni;

    }

    public List<Review> getRecensioni()
    {
        if(this.recensioni==null){
            this.recensioni= DBManager.getInstance().getReviewDAO().findByEvent(this);
        }
        return this.recensioni;
    }

}
