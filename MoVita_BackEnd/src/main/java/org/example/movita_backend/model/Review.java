package org.example.movita_backend.model;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Review {

    protected User utente;
    protected Event evento;
    protected String titolo;
    protected String descrizione;
    protected byte valutazione;
    protected String date;

}
