package org.example.movita_backend.services.impl;

import org.example.movita_backend.model.Category;
import org.example.movita_backend.model.Event;
import org.example.movita_backend.model.User;
import org.example.movita_backend.persistence.DBManager;
import org.example.movita_backend.persistence.dao.UserDao;
import org.example.movita_backend.persistence.proxy.UserProxy;
import org.example.movita_backend.services.interfaces.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements IUserService{
    private final UserDao userDao;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserService() {
        this.userDao = DBManager.getInstance().getUserDAO();
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
    public User getUserByEmail(String email) {
        return userDao.findByEmail(email);
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
    public List<Event> getCreatedEventsByUserId(int userId) {
        UserProxy userProxy = new UserProxy(userDao.findById(userId));
        return userProxy.getCreatedEvents(userId);
    }

    @Override
    public List<Category> getCategories(int userId) {
        UserProxy userProxy = new UserProxy(userDao.findById(userId));
        return userProxy.getCategorieInteressate();
    }

    @Override
    public List<User> searchUsers(String filter) {
        return userDao.findUserByUsername(filter);
    }

    @Override
    public List<User> getFriends(int userId) {
        UserProxy userProxy = new UserProxy(userDao.findById(userId));

        return userProxy.getAmici(userId);
    }

    @Override
    public void updatePremiumStatus(int userId) {
        userDao.updatePremiumStatus(userId);
    }

    @Override
    public boolean checkFriendship(int userId1, int userId2) {
        return userDao.checkFriendship(userId1, userId2);
    }

    @Override
    public User updatePerson(int userId, User user) {
        return userDao.updatePerson(userId, user);
    }

    @Override
    public User updateAgency(int userId, User user) {
        return userDao.updateAgency(userId, user);
    }

    @Override
    public User updateUserPassword(int userId, String password) {
        return userDao.updatePassword(userId, passwordEncoder.encode(password));
    }
}
