package org.example.movita_backend.services.interfaces;

import org.example.movita_backend.model.Category;
import org.example.movita_backend.model.Event;
import org.example.movita_backend.model.User;
import org.example.movita_backend.model.dto.EventCategories;
import org.example.movita_backend.model.dto.UserCategories;

import java.util.List;

public interface ICategoryService {
    public List<Category> getAll();

    public Category getById(int id);

    public List<Category> getByName(String nome);

    public List<User> getUsersByCategory(int categoryId);

    public List<Event> getEventsByCategory(int eventId);

    public void insertUserCategories(UserCategories userCategories);

    public void insertEventCategories(EventCategories eventCategories);
}
