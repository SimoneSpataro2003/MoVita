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
    protected String date;
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
    private List<Category> categorie;
    //private List<???> recensori;
    //private List<???> partecipanti;
}
