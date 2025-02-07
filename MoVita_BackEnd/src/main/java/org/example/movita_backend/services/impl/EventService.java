package org.example.movita_backend.services.impl;

import org.example.movita_backend.exception.event.EventNotValid;
import org.example.movita_backend.model.Booking;
import org.example.movita_backend.model.Category;
import org.example.movita_backend.model.Event;
import org.example.movita_backend.model.Review;
import org.example.movita_backend.model.dto.EventFilter;
import org.example.movita_backend.persistence.DBManager;
import org.example.movita_backend.persistence.dao.EventDao;
import org.example.movita_backend.persistence.proxy.EventProxy;
import org.example.movita_backend.services.interfaces.IEventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.example.movita_backend.model.EventRequest;

import java.util.List;

@Service
class EventService implements IEventService {


    private final EventDao eventDao;

    EventService(EventDao eventDao){this.eventDao = eventDao;}


    @Override
    public List<Event> findAll() {
        return eventDao.findAll();
    }

    @Override
    public Event findById(int id) {
        return eventDao.findById(id);
    }

    @Override
    public List<Event> findByFilter(EventFilter eventFilter) {
        return eventDao.findByFilter(eventFilter);
    }

    public List<Category> findCategories(int id_evento){
        EventProxy eventProxy = new EventProxy(DBManager.getInstance().getEventDAO().findById(id_evento));
        return eventProxy.getCategorie();
    }
    public List<Booking> findPrenotazioni(int id_evento){
        EventProxy eventProxy = new EventProxy(DBManager.getInstance().getEventDAO().findById(id_evento));
        return eventProxy.getPrenotazioni();
    }
    public String findDescrizione(int id_evento){
        EventProxy eventProxy = new EventProxy(DBManager.getInstance().getEventDAO().findById(id_evento));
        return eventProxy.getDescrizione();
    }

    public List<Review> findRecensioni(int id_evento) {
        EventProxy eventProxy = new EventProxy(DBManager.getInstance().getEventDAO().findById(id_evento));
        return eventProxy.getRecensioni();
    }

    // Register event method
    private Event registerEvent(EventRequest eventRequest)
    {
        // Create a new Event object
        Event event = new Event();

        // Ensure the eventRequest object is not null to avoid NullPointerException
        if (eventRequest != null)
        {
            // Mapping fields from EventRequest to Event
            event.setNome(eventRequest.getTitle());  // Set event name (title)
            event.setDescrizione(eventRequest.getDescription());  // Set event description
            event.setData(eventRequest.getDate());  // Set event date
            event.setPrezzo(eventRequest.getPrice());  // Set event price
            event.setIndirizzo(eventRequest.getAddress());  // Set event address
            event.setMaxNumPartecipanti(eventRequest.getMaxParticipants());  // Set max participants
            event.setEtaMinima((byte) eventRequest.getMinAge());  // Set min age for participants
        }
        else
        {
            throw new IllegalArgumentException("EventRequest cannot be null");
        }

        return event;
    }


    // Create event method
    public Event createEvent(Event event) {

        // Save event to the database (through EventDao)
        int id = eventDao.save(event);

        // Fetch the saved event by ID (assuming the method returns an Event object)
        return eventDao.findById(id);
    }

    private void checkEventsValid(Event evento) throws EventNotValid {
        if(evento==null){
            throw new EventNotValid("Event must not be null");
        }

        if(evento.getNome()==null || evento.getNome().isEmpty()){
            throw new EventNotValid("Event nome must not be null and not empty");
        }

        //TODO other checks..

    }

    @Override
    public Event updateEvent(Event event) throws Exception {
        return eventDao.update(event);
    }

    @Override
    public void deleteEvent(int event) {
        eventDao.delete(event);
    }
}
