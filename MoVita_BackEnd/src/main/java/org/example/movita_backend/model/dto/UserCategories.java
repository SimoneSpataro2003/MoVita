package org.example.movita_backend.model.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class UserCategories {
    private int utente_id;
    private List<Integer> categorie_id;
}
