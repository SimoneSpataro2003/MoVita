package org.example.movita_backend.services.impl;

import org.example.movita_backend.exception.event.EventNotValid;
import org.example.movita_backend.model.Booking;
import org.example.movita_backend.model.Category;
import org.example.movita_backend.model.Event;
import org.example.movita_backend.model.Review;
import org.example.movita_backend.persistence.DBManager;
import org.example.movita_backend.persistence.dao.EventDao;
import org.example.movita_backend.persistence.proxy.EventProxy;
import org.example.movita_backend.services.interfaces.IEventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public List<Event> findByFilter(String filter) {
        return eventDao.findByFilter(filter);
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

    public List<Review> findRecensioni(int id_evento){
        EventProxy eventProxy = new EventProxy(DBManager.getInstance().getEventDAO().findById(id_evento));
        return eventProxy.getRecensioni();
    }


    @Override
    public Event createEvent(Event event) throws Exception {

        checkEventsValid(event);
        int id = eventDao.save(event);

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
