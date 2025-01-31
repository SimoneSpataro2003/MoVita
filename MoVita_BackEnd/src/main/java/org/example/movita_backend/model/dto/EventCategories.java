package org.example.movita_backend.model.dto;

import lombok.Getter;
import org.example.movita_backend.model.Category;

import java.util.List;

@Getter
public class EventCategories {
    private int evento_id;
    private List<Integer> categorie_id;
}
