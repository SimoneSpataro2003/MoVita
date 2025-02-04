package org.example.movita_backend.persistence.dao;

import org.example.movita_backend.model.Booking;
import org.example.movita_backend.model.Event;
import org.example.movita_backend.model.User;
import org.example.movita_backend.model.dto.BookingEvent;

import java.util.List;

public interface BookingDao {

    List<Booking> findAll();
    List<Booking> findByEvent(Event event);
    List<Booking> findByUser(User user);
    List<Booking> findEventsById(int id);
    Booking findById(User user,Event event);
    Booking update(BookingEvent booking);
    void save(BookingEvent booking);


}
