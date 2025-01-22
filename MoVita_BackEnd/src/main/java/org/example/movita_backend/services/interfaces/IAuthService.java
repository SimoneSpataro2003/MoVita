package org.example.movita_backend.services.interfaces;

import org.example.movita_backend.model.User;

public interface IAuthService {
    //registrazioni
    User registerPerson(String username,String email, String password, String citta, String nome,String cognome);
    User registerAgency(String username, String email, String password, String citta,String nome, String partitaIva, String indirizzo, String recapito);

    public String login(String username, String password);
    public void logout(String token);
}
