package org.example.movita_backend.controller;

import org.example.movita_backend.model.Category;
import org.example.movita_backend.model.Event;
import org.example.movita_backend.model.User;
import org.example.movita_backend.model.dto.EventCategories;
import org.example.movita_backend.model.dto.UserCategories;
import org.example.movita_backend.services.interfaces.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Map;

@RestController
@RequestMapping("/api/category")
@CrossOrigin(origins = "http://localhost:4200")
public class CategoryController {
    @Autowired
    ICategoryService categoryService;

    @GetMapping("/find-all")
    ResponseEntity<Collection<Category>> findAll() {
        Collection<Category> allCategories = this.categoryService.getAll();
        return ResponseEntity.ok(allCategories);
    }

    @GetMapping("/find-by-id/{categoryId}")
    ResponseEntity<Category> findById(@PathVariable int categoryId) {
        Category category = this.categoryService.getById(categoryId);
        return ResponseEntity.ok(category);
    }

    @GetMapping("/find-by-name/{categoryName}")
    ResponseEntity<Collection<Category>> findByName(@PathVariable String categoryName) {
        Collection<Category> category = this.categoryService.getByName(categoryName);
        return ResponseEntity.ok(category);
    }

    @GetMapping("/find-users-by-category/{categoryId}")
    ResponseEntity<Collection<User>> findUsersByCategory(@PathVariable int categoryId) {
        Collection<User> users = this.categoryService.getUsersByCategory(categoryId);
        return ResponseEntity.ok(users);
    }

    @GetMapping("/find-events-by-category/{categoryId}")
    ResponseEntity<Collection<Event>> findEventsByCategory(@PathVariable int categoryId) {
        Collection<Event> events = this.categoryService.getEventsByCategory(categoryId);
        return ResponseEntity.ok(events);
    }

    //NOTA: essendo il body complesso, in questi casi si realizza un DTO e si usa quello come body.
    @PostMapping("/insert-user-categories")
    ResponseEntity<?> insertUserCategories(@RequestBody UserCategories userCategories) {
        this.categoryService.insertUserCategories(userCategories);
        return ResponseEntity.ok(Map.of("esito","Inserimento effettuato correttamente."));
    }

    @PostMapping("/insert-event-categories")
    ResponseEntity<?> insertEventCategories(@RequestBody EventCategories eventCategories) {
        this.categoryService.insertEventCategories(eventCategories);
        return ResponseEntity.ok(Map.of("esito","Inserimento effettuato correttamente."));
    }
}
