package org.example.movita_backend.services.interfaces;

import org.example.movita_backend.model.Category;

import java.util.List;

public interface ICategoryService {
    public List<Category> getAll();

    public Category getById(int id);

    public List<Category> getByName(String nome);
}
