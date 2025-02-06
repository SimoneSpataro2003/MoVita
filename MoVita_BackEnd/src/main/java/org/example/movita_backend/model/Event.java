package org.example.movita_backend.model;

import java.util.List;

public class Event {

    protected int id;
    protected String nome;
    protected String data;
    protected float prezzo;
    protected String citta;
    protected String indirizzo;
    protected int numPartecipanti;
    protected int maxNumPartecipanti;
    protected byte etaMinima;
    protected String descrizione;
    protected float valutazioneMedia;
    protected User creatore;

    // Relations
    protected List<Category> categorie;
    protected List<Booking> prenotazioni;
    protected List<Review> recensioni;

    // Default constructor
    public Event() {}

    // All-args constructor
    public Event(int id, String nome, String data, float prezzo, String citta, String indirizzo, int numPartecipanti, int maxNumPartecipanti, byte etaMinima, String descrizione, float valutazioneMedia, User creatore, List<Category> categorie, List<Booking> prenotazioni, List<Review> recensioni) {
        this.id = id;
        this.nome = nome;
        this.data = data;
        this.prezzo = prezzo;
        this.citta = citta;
        this.indirizzo = indirizzo;
        this.numPartecipanti = numPartecipanti;
        this.maxNumPartecipanti = maxNumPartecipanti;
        this.etaMinima = etaMinima;
        this.descrizione = descrizione;
        this.valutazioneMedia = valutazioneMedia;
        this.creatore = creatore;
        this.categorie = categorie;
        this.prenotazioni = prenotazioni;
        this.recensioni = recensioni;
    }

    // Getter and Setter for id
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    // Getter and Setter for nome
    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    // Getter and Setter for data
    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    // Getter and Setter for prezzo
    public float getPrezzo() {
        return prezzo;
    }

    public void setPrezzo(float prezzo) {
        this.prezzo = prezzo;
    }

    // Getter and Setter for citta
    public String getCitta() {
        return citta;
    }

    public void setCitta(String citta) {
        this.citta = citta;
    }

    // Getter and Setter for indirizzo
    public String getIndirizzo() {
        return indirizzo;
    }

    public void setIndirizzo(String indirizzo) {
        this.indirizzo = indirizzo;
    }

    // Getter and Setter for numPartecipanti
    public int getNumPartecipanti() {
        return numPartecipanti;
    }

    public void setNumPartecipanti(int numPartecipanti) {
        this.numPartecipanti = numPartecipanti;
    }

    // Getter and Setter for maxNumPartecipanti
    public int getMaxNumPartecipanti() {
        return maxNumPartecipanti;
    }

    public void setMaxNumPartecipanti(int maxNumPartecipanti) {
        this.maxNumPartecipanti = maxNumPartecipanti;
    }

    // Getter and Setter for etaMinima
    public byte getEtaMinima() {
        return etaMinima;
    }

    public void setEtaMinima(byte etaMinima) {
        this.etaMinima = etaMinima;
    }

    // Getter and Setter for descrizione
    public String getDescrizione() {
        return descrizione;
    }

    public void setDescrizione(String descrizione) {
        this.descrizione = descrizione;
    }

    // Getter and Setter for valutazioneMedia
    public float getValutazioneMedia() {
        return valutazioneMedia;
    }

    public void setValutazioneMedia(float valutazioneMedia) {
        this.valutazioneMedia = valutazioneMedia;
    }

    // Getter and Setter for creatore
    public User getCreatore() {
        return creatore;
    }

    public void setCreatore(User creatore) {
        this.creatore = creatore;
    }

    // Getter and Setter for categorie
    public List<Category> getCategorie() {
        return categorie;
    }

    public void setCategorie(List<Category> categorie) {
        this.categorie = categorie;
    }

    // Getter and Setter for prenotazioni
    public List<Booking> getPrenotazioni() {
        return prenotazioni;
    }

    public void setPrenotazioni(List<Booking> prenotazioni) {
        this.prenotazioni = prenotazioni;
    }

    // Getter and Setter for recensioni
    public List<Review> getRecensioni() {
        return recensioni;
    }

    public void setRecensioni(List<Review> recensioni) {
        this.recensioni = recensioni;
    }

    // toString method for debugging/printing the object
    @Override
    public String toString() {
        return "Event{" +
                "id=" + id +
                ", nome='" + nome + '\'' +
                ", data='" + data + '\'' +
                ", prezzo=" + prezzo +
                ", citta='" + citta + '\'' +
                ", indirizzo='" + indirizzo + '\'' +
                ", numPartecipanti=" + numPartecipanti +
                ", maxNumPartecipanti=" + maxNumPartecipanti +
                ", etaMinima=" + etaMinima +
                ", descrizione='" + descrizione + '\'' +
                ", valutazioneMedia=" + valutazioneMedia +
                ", creatore=" + creatore +
                ", categorie=" + categorie +
                ", prenotazioni=" + prenotazioni +
                ", recensioni=" + recensioni +
                '}';
    }
<<<<<<< HEAD
}


=======
}
>>>>>>> origin/main
