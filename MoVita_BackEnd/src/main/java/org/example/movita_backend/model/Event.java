package org.example.movita_backend.model;

import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Event {
    protected int id;
    protected String nome;
    protected String data;
    protected float prezzo;
    protected String citta;
    protected String indirizzo;
    protected int numPartecipanti;
    protected int maxNumPartecipanti;
    protected byte etaMinima;
    protected String descrizione;
    protected float valutazioneMedia;
    protected User creatore;

    // Relations
    protected List<Category> categorie;
    //protected List<User> partecipanti; <---?? Non solo List<Evento>, ma anche altre informazioni!

    //protected List<???> recensori; <--- Stesso problema qui
}
