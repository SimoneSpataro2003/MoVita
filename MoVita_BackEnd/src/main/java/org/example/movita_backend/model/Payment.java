package org.example.movita_backend.model;

import lombok.Data;

@Data
public class Payment {
    protected int id;
    protected String titolo;
    protected int ammontare;
    protected String data;
    protected int id_utente;

    public Payment() {
    }

    public Payment(int id, String titolo, int ammontare, String data, int id_utente) {
        this.id = id;
        this.titolo = titolo;
        this.ammontare = ammontare;
        this.data = data;
        this.id_utente = id_utente;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitolo() {
        return titolo;
    }

    public void setTitolo(String titolo) {
        this.titolo = titolo;
    }

    public long getAmmontare() {
        return ammontare;
    }

    public void setAmmontare(int ammontare) {
        this.ammontare = ammontare;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public int getId_utente() {
        return id_utente;
    }

    public void setId_utente(int id_utente) {
        this.id_utente = id_utente;
    }
}
