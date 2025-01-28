package org.example.movita_backend.services.interfaces;

import org.example.movita_backend.model.User;

import java.util.List;

public interface IUserService {
    User findByUsername(String username);
    void makeFriendship(int id_utente1, int id_utente2);
    void deleteFriendship(int id_utente1, int id_utente2);
}
