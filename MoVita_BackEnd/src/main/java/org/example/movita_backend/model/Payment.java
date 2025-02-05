package org.example.movita_backend.model;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class Payment {
    protected int id;
    protected String titolo;
    protected int ammontare;
    protected String data;
    protected int id_utente;

    public Payment() {
    }

    public Payment(String titolo, int ammontare, String data, int id_utente)
    {
        this.titolo = titolo;
        this.ammontare = ammontare;
        this.data = data;
        this.id_utente = id_utente;
    }

}
