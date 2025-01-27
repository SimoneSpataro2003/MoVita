package org.example.movita_backend.model;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Booking {
    protected Event evento;
    protected User utente;
    protected String data;
    protected Boolean annullata;  //se la prenotazione è stata annullata
}
