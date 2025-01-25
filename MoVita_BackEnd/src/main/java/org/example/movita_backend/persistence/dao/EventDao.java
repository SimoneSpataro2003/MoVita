package org.example.movita_backend.persistence.dao;

import org.example.movita_backend.model.Category;
import org.example.movita_backend.model.Event;

import java.util.List;

public interface EventDao {

    void create(Event event);
    List<Event> findAll();
    Event findById(int id);
    Event update(Event event);

    List<Event> findByFilter(String filter);
    String findDescrizione(Event e);

    //associazioni
    List<Category> findCategories(int id);
    //TODO: ALTRI

    int save(Event event);
    void delete(Event event);


}
