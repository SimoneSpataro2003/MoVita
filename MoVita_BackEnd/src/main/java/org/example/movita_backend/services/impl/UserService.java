package org.example.movita_backend.services.impl;

import org.example.movita_backend.model.Event;
import org.example.movita_backend.model.User;
import org.example.movita_backend.persistence.DBManager;
import org.example.movita_backend.persistence.dao.UserDao;
import org.example.movita_backend.persistence.proxy.UserProxy;
import org.example.movita_backend.services.interfaces.IUserService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements IUserService{
    private final UserDao userDao;
    private final UserProxy userProxy;

    public UserService() {
        this.userDao = DBManager.getInstance().getUserDAO();
        this.userProxy = new UserProxy();
    }

    @Override
    public User getUserById(int userId) {
        return userDao.findById(userId);
    }

    @Override
    public User getUserByUsername(String username) {
        return userDao.findByUsername(username);
    }

    @Override
    public void makeFriendship(int userId1, int userId2) {userDao.makeFriendships(userId1, userId2);}

    @Override
    public void deleteFriendship(int userId1, int userId2) {
        userDao.deleteFriendships(userId1, userId2);
    }

    @Override
    public int countFriendships(int userId) {
        return userDao.countFriends(userId);
    }

    @Override
    public List<Event> getCreatedEventsByUserId() {
        return userProxy.getCreatedEvents();
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
