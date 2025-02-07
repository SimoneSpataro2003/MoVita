package org.example.movita_backend.persistence.dao;

import org.example.movita_backend.model.Category;
import org.example.movita_backend.model.Event;
import org.example.movita_backend.model.User;

import java.util.List;

public interface CategoryDao {
    List<Category> findAll();
    Category findById(int id);
    List<Category> findByName(String keyword);

    void insertUserCategories(User user, List<Category> categories);
    void insertEventCategories(Event event, List<Category> categories);

    //associazioni
    List<User> findUsers(Category category);
    List<Event> findEvents(Category category);

    void insertCategoryToEvent(int eventId, String categoryName);
}
