package org.example.movita_backend.persistence.model;

import lombok.Data;

import java.util.List;

@Data
public class User {
    private int id;
    private short tipo;
    private boolean verificato;
    private String username;
    private String password;
    private String luogo;
    private String email;
    private int credito;
    private Short immagineProfilo;
    private short eta;
    private short valutazione;

    // Relations
    private List<User> friends;
}

