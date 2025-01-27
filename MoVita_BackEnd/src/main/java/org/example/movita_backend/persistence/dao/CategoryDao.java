package org.example.movita_backend.persistence.dao;

import org.example.movita_backend.model.Category;
import org.example.movita_backend.model.Event;
import org.example.movita_backend.model.User;

import java.util.List;

public interface CategoryDao {
    List<Category> findAll();
    Category findById(int id);
    List<Category> findByName(String keyword);

    //associazioni
    User findInterestedUser(int id);
    List<Event> findEvents(int id);
}
