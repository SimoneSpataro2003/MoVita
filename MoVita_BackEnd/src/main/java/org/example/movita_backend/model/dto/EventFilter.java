package org.example.movita_backend.model.dto;

import lombok.Getter;
import org.example.movita_backend.model.Category;

import java.util.List;

@Getter
public class EventFilter {
    private int creatore_id;
    private String citta;
    private List<Integer> categorie_id;
    private int etaMinima;
    private float prezzoMassimo;
    private float valutazioneMedia;
    private boolean almenoMetaPartecipanti;
}
