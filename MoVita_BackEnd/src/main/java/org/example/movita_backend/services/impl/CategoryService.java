package org.example.movita_backend.services.impl;

import org.example.movita_backend.exception.category.CategoryNotFoundExeption;
import org.example.movita_backend.exception.category.EmptyCategoryListExeption;
import org.example.movita_backend.model.Category;
import org.example.movita_backend.model.Event;
import org.example.movita_backend.model.User;
import org.example.movita_backend.persistence.DBManager;
import org.example.movita_backend.persistence.dao.CategoryDao;
import org.example.movita_backend.persistence.proxy.CategoryProxy;
import org.example.movita_backend.services.interfaces.ICategoryService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService implements ICategoryService {
    private final CategoryDao categoryDao;

    public CategoryService() { this.categoryDao = DBManager.getInstance().getCategoryDAO(); }

    public List<Category> getAll() {
        List<Category> list = categoryDao.findAll();
        if (!list.isEmpty()) return list;
        else throw new EmptyCategoryListExeption("category list is empty");
    }

    public Category getById(int id) {
        Category category = categoryDao.findById(id);
        if (category != null) return category;
        else throw new CategoryNotFoundExeption("category not found");
    }

    public List<Category> getByName(String name) {
        List<Category> list = categoryDao.findByName(name);
        if (!list.isEmpty()) return list;
        else throw new CategoryNotFoundExeption("categories not found");
    }

    public List<User> getUsersByCategory(int categoryId) {
        CategoryProxy categoryProxy = new CategoryProxy(DBManager.getInstance().getCategoryDAO().findById(categoryId));
        return categoryProxy.getUtentiInteressati();
    }

    public List<Event> getEventsByCategory(int categoryId) {
        CategoryProxy categoryProxy = new CategoryProxy(DBManager.getInstance().getCategoryDAO().findById(categoryId));
        return categoryProxy.getEventi();
    }
}
