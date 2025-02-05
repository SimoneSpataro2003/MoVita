package org.example.movita_backend.model.dto;

import lombok.Getter;
import org.example.movita_backend.model.Event;
import org.example.movita_backend.model.User;
@Getter
public class ReviewEvent {

    protected int utente;
    protected int evento;
    protected String titolo;
    protected String descrizione;
    protected byte valutazione;


}
