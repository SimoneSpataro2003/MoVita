package org.example.movita_backend.model;

import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Setter
public class Category {
    //FIXME (SIMONE): correggi. Il proxy sovrascrive il metodo getter per definire i dati (vedi il proxy di Evento.)

    protected int id;

    protected String nome;

    protected String descrizione;

    // Relation
    protected List<User> utentiInteressati;
    protected List<Event> eventi;
}
