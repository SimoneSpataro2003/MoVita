package org.example.movita_backend.persistence.impl;

import org.example.movita_backend.model.Event;
import org.example.movita_backend.model.User;
import org.example.movita_backend.persistence.dao.CategoryDao;

import java.util.List;

//TODO: realizza il DAO delle categorie.
public class CategoryDaoJDBC implements CategoryDao {
    @Override
    public User findById(int id) {
        return null;
    }

    @Override
    public List<User> findAll() {
        return List.of();
    }

    @Override
    public List<User> findInterestedUser(int id) {
        return List.of();
    }

    @Override
    public List<Event> findEvents(int id) {
        return List.of();
    }
}
