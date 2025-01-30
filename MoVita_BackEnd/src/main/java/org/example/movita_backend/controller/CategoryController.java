package org.example.movita_backend.controller;

import org.example.movita_backend.model.Category;
import org.example.movita_backend.model.Event;
import org.example.movita_backend.model.User;
import org.example.movita_backend.services.interfaces.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/api/category")
@CrossOrigin(origins = "http://localhost:4200")
public class CategoryController {
    @Autowired
    ICategoryService categoryService;

    @GetMapping("/get-all-categories")
    ResponseEntity<Collection<Category>> findAll() {
        Collection<Category> allCategories = this.categoryService.getAll();
        return ResponseEntity.ok(allCategories);
    }

    @GetMapping("/get-category-by-id")
    ResponseEntity<Category> findById(@RequestParam(name = "categoryId") int categoryId) {
        Category category = this.categoryService.getById(categoryId);
        return ResponseEntity.ok(category);
    }

    @GetMapping("/get-category-by-name")
    ResponseEntity<Collection<Category>> findByName(@RequestParam(name = "categoryName") String categoryName) {
        Collection<Category> category = this.categoryService.getByName(categoryName);
        return ResponseEntity.ok(category);
    }

    @GetMapping("/get-users-by-category")
    ResponseEntity<Collection<User>> findUsers(@RequestParam(name = "userId") int userId) {
        Collection<User> users = this.categoryService.getUsersByCategory(userId);
        return ResponseEntity.ok(users);
    }

    @GetMapping("/get-events-by-category")
    ResponseEntity<Collection<Event>> findEvents(@RequestParam(name = "eventId") int eventId) {
        Collection<Event> events = this.categoryService.getEventsByCategory(eventId);
        return ResponseEntity.ok(events);
    }
}
