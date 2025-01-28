package org.example.movita_backend.services.impl;

import org.example.movita_backend.model.User;
import org.example.movita_backend.persistence.DBManager;
import org.example.movita_backend.persistence.dao.UserDao;
import org.example.movita_backend.services.interfaces.IUserService;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements IUserService {
    private UserDao userDao;

    public UserService() {
        this.userDao = DBManager.getInstance().getUserDAO();
    }

    @Override
    public User findByUsername(String username) {
        return userDao.findByUsername(username);
    }

    @Override
    public void makeFriendship(int id_utente1, int id_utente2) {
        userDao.makeFriendship(id_utente1, id_utente2);
    }

    @Override
    public void deleteFriendship(int id_utente1, int id_utente2) {
        userDao.deleteFriendship(id_utente1, id_utente2);
    }
}
