package org.example.movita_backend.persistence.dao;

import org.example.movita_backend.model.Event;
import org.example.movita_backend.model.User;

import java.util.List;

public interface CategoryDao {
    User findById(int id);
    List<User> findAll();

    //associazioni
    List<User> findInterestedUser(int id);
    List<Event> findEvents(int id);
}
