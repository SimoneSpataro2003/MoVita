package org.example.movita_backend.model.dto;

import lombok.Getter;
import lombok.Setter;
import org.example.movita_backend.model.Event;
import org.example.movita_backend.model.User;
@Getter
@Setter
public class BookingEvent {

    protected int evento;
    protected int utente;
    protected String data;
    protected Boolean annullata;  //se la prenotazione è stata annullata


}
