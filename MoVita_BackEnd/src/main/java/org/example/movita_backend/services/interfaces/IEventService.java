package org.example.movita_backend.services.interfaces;

import org.example.movita_backend.model.*;
import org.example.movita_backend.model.dto.EventFilter;
import org.example.movita_backend.persistence.DBManager;
import org.example.movita_backend.persistence.proxy.EventProxy;

import java.util.List;

public interface IEventService {

    List<Event> findAll();
    Event findById(int id);
    List<Event> findByFilter(EventFilter eventFilter);
    List<Category> findCategories(int id_evento);
    List<Booking> findPrenotazioni(int id_evento);
    List<Review> findRecensioni(int id_evento);
    String findDescrizione(int id_evento);
    Event createEvent(Event event) throws Exception;
    Event updateEvent(Event event) throws Exception;
    void deleteEvent(int eventId);

}
