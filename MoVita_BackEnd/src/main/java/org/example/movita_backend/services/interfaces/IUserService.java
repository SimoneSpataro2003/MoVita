package org.example.movita_backend.services.interfaces;

import org.example.movita_backend.model.Category;
import org.example.movita_backend.model.Event;
import org.example.movita_backend.model.User;

import java.util.List;

public interface IUserService {
    User getUserById(int userId);
    User getUserByUsername(String username);
    User getUserByEmail(String email);
    void makeFriendship(int userId1, int userId2);
    void deleteFriendship(int userId1, int userId2);
    List<User> searchUsers(String filter);
    int countFriendships(int userId);
    List<Event> getCreatedEventsByUserId(int userId);
    List<Category> getCategories(int userId);
    List<User> getFriends(int userId);
    void updatePremiumStatus(int userId);
    boolean checkFriendship(int userId1, int userId2);
    User updatePerson(int userId, User user);
    User updateAgency(int userId, User user);
    User updateUserPassword(int userId, String password);
}
