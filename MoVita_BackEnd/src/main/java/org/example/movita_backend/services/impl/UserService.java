package org.example.movita_backend.services.impl;

import org.example.movita_backend.model.User;
import org.example.movita_backend.persistence.DBManager;
import org.example.movita_backend.persistence.dao.UserDao;
import org.example.movita_backend.persistence.proxy.UserProxy;
import org.example.movita_backend.services.interfaces.IUserService;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements IUserService{
    private UserDao userDao;
    private UserProxy userProxy;

    public UserService() {
        this.userDao = DBManager.getInstance().getUserDAO();
    }

    @Override
    public User findByUsername(String username) {
        return userDao.findByUsername(username);
    }

    public void makeFriendship(int userId1, int userId2) {userDao.makeFriendships(userId1, userId2);}

    public void deleteFriendship(int userId1, int userId2) {
        userDao.deleteFriendships(userId1, userId2);
    }

    @Override
    public List<User> searchUsers(String filter) {
        return userProxy.searchFriendsWithFilter(filter);
    }

    @Override
    public List<User> getFriends() {
        return userProxy.getAmici();
    }
}
