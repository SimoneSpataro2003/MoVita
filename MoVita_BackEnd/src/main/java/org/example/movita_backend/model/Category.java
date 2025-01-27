package org.example.movita_backend.model;

import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Category {
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
