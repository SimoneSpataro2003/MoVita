package org.example.movita_backend.persistence.dao;

import org.example.movita_backend.model.Category;
import org.example.movita_backend.model.Event;
import org.example.movita_backend.model.dto.EventFilter;

import java.util.List;

public interface EventDao {

    void create(Event event);
    List<Event> findAll();
    Event findById(int id);
    Event update(Event event);
    List<Event> findByFilter(EventFilter eventFilter);
    String findDescrizione(Event e);

    //associazioni
    List<Category> findCategories(Event event);
    //TODO: ALTRI

    int save(Event event);
    void delete(int eventId);


}
