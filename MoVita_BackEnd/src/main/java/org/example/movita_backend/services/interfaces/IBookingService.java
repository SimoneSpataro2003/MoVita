package org.example.movita_backend.services.interfaces;

import org.example.movita_backend.model.Booking;
import org.example.movita_backend.model.Event;

import java.util.List;

public interface IBookingService {

    List<Booking> findAll();
    Booking findById(int id_utente, int id_evento);
    List<Booking> findByEvent(int id_evento);
    Booking createBooking(Booking booking) throws Exception;
    Booking updateBooking(Booking booking) throws Exception;


}
