package org.example.movita_backend.persistence.dao;

import org.example.movita_backend.model.Booking;
import org.example.movita_backend.model.Event;
import org.example.movita_backend.model.User;

import java.util.List;

public interface BookingDao {

    List<Booking> findAll();
    Booking findById(User user,Event event);
    Booking update(Booking booking);
    int save(Booking booking);


}
