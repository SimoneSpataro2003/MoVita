package org.example.movita_backend.model;

import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Setter
public class Category {
    protected int id;

    protected String nome;

    protected String descrizione;

    // Relation
    protected List<User> utentiInteressati;
    protected List<Event> eventi;
}
