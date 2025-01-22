package org.example.movita_backend.model;

import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Category {
    protected int id;
    protected String nome;
    protected String descrizione;

    // Relations
    protected List<User> utentiInteressati;
    protected List<Event> eventi;
}
