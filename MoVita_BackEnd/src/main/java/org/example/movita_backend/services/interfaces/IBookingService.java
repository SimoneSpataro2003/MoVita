package org.example.movita_backend.services.interfaces;

import org.example.movita_backend.model.Booking;
import org.example.movita_backend.model.Event;
import org.example.movita_backend.model.dto.BookingEvent;

import java.util.List;

public interface IBookingService {

    List<Booking> findAll();
    Booking findById(int id_utente, int id_evento);
    List<Booking> findByEvent(int id_evento);
    List<Booking> findByUser(int id_utente);
    Booking createBooking(BookingEvent booking) throws Exception;
    Booking updateBooking(BookingEvent booking) throws Exception;
    List<Booking> findBookingById(int id_utente);

}
