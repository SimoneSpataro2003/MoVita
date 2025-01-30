package org.example.movita_backend.persistence.proxy;

import org.example.movita_backend.model.*;
import org.example.movita_backend.persistence.DBManager;

import java.sql.Connection;
import java.util.List;

public class CategoryProxy extends Category {

    public CategoryProxy(Category category) {
        this.id = category.getId();
        this.nome = category.getNome();
        this.descrizione = category.getDescrizione();
    }

    @Override
    public List<User> getUtentiInteressati(){
        this.utentiInteressati = DBManager.getInstance().getCategoryDAO().findUsers(this);
        return utentiInteressati;
    }

    @Override
    public List<Event> getEventi(){
        this.eventi = DBManager.getInstance().getCategoryDAO().findEvents(this);
        return eventi;
    }
}
