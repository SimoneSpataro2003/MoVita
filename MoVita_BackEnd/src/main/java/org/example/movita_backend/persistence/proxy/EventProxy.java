package org.example.movita_backend.persistence.proxy;

import org.example.movita_backend.model.Category;
import org.example.movita_backend.model.Event;
import org.example.movita_backend.model.User;
import org.example.movita_backend.persistence.DBManager;
import org.example.movita_backend.persistence.dao.EventDao;

import java.sql.Connection;
import java.util.List;

public class EventProxy extends Event {

    Connection connection;

    public EventProxy(Connection connection) {
        this.connection = connection;
    }

    public List<Category> getCategory(){
        if(this.categorie==null){
    //        this.categorie = DBManager.getInstance().getCategoryDao()...
        }
        return categorie;
    }

    public List<User> getPartecipanti(){

    }


}
