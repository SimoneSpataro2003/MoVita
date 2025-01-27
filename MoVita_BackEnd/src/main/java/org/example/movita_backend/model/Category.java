package org.example.movita_backend.model;

import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Category {
    //FIXME (SIMONE): correggi. Il proxy sovrascrive il metodo getter per definire i dati (vedi il proxy di Evento.)

    @Setter
    @Getter
    protected int id;

    @Setter
    @Getter
    protected String nome;

    @Setter
    @Getter
    protected String descrizione;

    // Relations
    protected List<User> utentiInteressati;
    protected List<Event> eventi;
}
