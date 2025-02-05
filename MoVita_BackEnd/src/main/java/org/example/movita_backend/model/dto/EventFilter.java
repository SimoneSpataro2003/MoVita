package org.example.movita_backend.model.dto;

import lombok.Getter;
import org.example.movita_backend.model.Category;

import java.util.List;

@Getter
public class EventFilter {
    private String usernameCreatore;
    private String nome;
    private String citta;
    private List<Integer> categorieId;
    private int etaMinima;
    private float prezzoMassimo;
    private float valutazioneMedia;
    private boolean almenoMetaPartecipanti;
}
