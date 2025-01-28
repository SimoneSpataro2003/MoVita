package org.example.movita_backend.controller;

import org.example.movita_backend.model.User;
import org.example.movita_backend.persistence.proxy.UserProxy;
import org.example.movita_backend.services.impl.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController
{

    private final UserService userService;

    @Autowired
    public UserController(UserService userService)
    {
        this.userService = userService;
    }

    @PostMapping("/make-friendship/{userId1}/{userId2}")
    public ResponseEntity<String> createFriendship(@PathVariable int userId1, @PathVariable int userId2)
    {
        try
        {
            userService.makeFriendship(userId1, userId2);
            return ResponseEntity.status(HttpStatus.CREATED).body("Friendship created successfully.");
        }
        catch (Exception e)
        {
            System.err.println("Error creating friendship: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while creating the friendship.");
        }
    }

    @PostMapping("/delete-friendship/{userId1}/{userId2}")
    public ResponseEntity<Void> deleteFriendship(@PathVariable int userId1, @PathVariable int userId2)
    {
        try
        {
            userService.deleteFriendship(userId1, userId2);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        catch (Exception e)
        {
            System.err.println("Error deleting friendship: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/find-friends/")
    public ResponseEntity<List<User>> getFriendsById()
    {
        try
        {
            List<User> friends = userService.getFriends();
            return ResponseEntity.status(HttpStatus.OK).body(friends);
        }
        catch (Exception e)
        {
            System.err.println("Error finding friends: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/search-friends/{filter}")
    public ResponseEntity<List<User>> findAmiciByFilter(@PathVariable String filter)
    {
        try
        {
            List<User> friends = userService.searchUsers(filter);
            return ResponseEntity.status(HttpStatus.OK).body(friends);
        }
        catch (Exception e)
        {
            System.err.println("Error finding friends: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
