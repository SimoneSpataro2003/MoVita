package org.example.movita_backend.services.interfaces;

import org.example.movita_backend.model.Event;

import java.util.List;

public interface IEventService {

    List<Event> findAll();
    Event findById(int id);
    List<Event> findByFilter(String filter);
    Event createEvent(Event event) throws Exception;
    Event updateEvent(String name, Event event) throws Exception;
    void deleteEvent(String event);

}
