package org.example.movita_backend.exception.category;

public class CategoryNotFoundExeption extends RuntimeException {
    public CategoryNotFoundExeption(String message) {
        super(message);
    }
}
