package org.example.movita_backend.services.interfaces;

import org.example.movita_backend.model.Event;
import org.example.movita_backend.model.User;

import java.util.List;

public interface IUserService {
    User getUserById(int userId);
    User findByUsername(String username);
    void makeFriendship(int userId1, int userId2);
    void deleteFriendship(int userId1, int userId2);
    List<User> searchUsers(String filter);
    int countFriendships(int userId);
    List<Event> getCreatedEventsByUserId();
    List<User> getFriends();
}
