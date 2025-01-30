package org.example.movita_backend.services.impl;

import org.example.movita_backend.model.Booking;
import org.example.movita_backend.model.Event;
import org.example.movita_backend.persistence.DBManager;
import org.example.movita_backend.persistence.dao.BookingDao;
import org.example.movita_backend.persistence.dao.EventDao;
import org.example.movita_backend.services.interfaces.IBookingService;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
class BookingService implements IBookingService {

    // Memo Giuseppe da provare
    private final BookingDao bookingDao;

    BookingService(BookingDao bookingDao){this.bookingDao = bookingDao;}

    @Override
    public List<Booking> findAll() {
        return bookingDao.findAll();
    }

    @Override
    public Booking findById(int id_utente,int id_evento) {
        return bookingDao.findById(DBManager.getInstance().getUserDAO().findById(id_utente),DBManager.getInstance().getEventDAO().findById(id_evento));
    }

    @Override
    public List<Booking> findByEvent(int id_evento){
        return bookingDao.findByEvent(DBManager.getInstance().getEventDAO().findById(id_evento));
    }

    @Override
    public List<Booking> findByUser(int id_utente) {
        return bookingDao.findByUser(DBManager.getInstance().getUserDAO().findById(id_utente));
    }

    @Override
    public Booking createBooking(Booking booking) throws Exception {
        bookingDao.save(booking);
        return bookingDao.findById(booking.getUtente(),booking.getEvento());
    }

    @Override
    public Booking updateBooking(Booking booking) throws Exception {
        bookingDao.save(booking);
        return bookingDao.findById(booking.getUtente(),booking.getEvento());
    }
}
