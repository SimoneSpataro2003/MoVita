package org.example.movita_backend.controller;

import org.example.movita_backend.model.User;
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

    @GetMapping("/get-user/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable int userId)
    {
        try
        {
            User user = userService.getUserById(userId);
            return ResponseEntity.ok(user);
        }
        catch (Exception e)
        {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/get-user-by-username/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable String username)
    {
        try
        {
            User user = userService.getUserByUsername(username);
            return ResponseEntity.ok(user);
        }
        catch (Exception e)
        {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/make-friendship/{userId1}/{userId2}")
    public ResponseEntity<String> createFriendship(@PathVariable int userId1, @PathVariable int userId2)
    {
        try
        {
            System.out.println("aggiungo amicizia " + userId1 + "-" + userId2);
            userService.makeFriendship(userId1, userId2);
            return ResponseEntity.status(HttpStatus.CREATED).body("Friendship created successfully.");
        }
        catch (Exception e)
        {
            System.err.println("Error creating friendship: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while creating the friendship.");
        }
    }

    @PostMapping("/delete-friendship/{userId1}/{userId2}")
    public ResponseEntity<Void> deleteFriendship(@PathVariable int userId1, @PathVariable int userId2)
    {
        try
        {
            System.out.println("elimino amicizia " + userId1 + "-" + userId2);
            userService.deleteFriendship(userId1, userId2);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        catch (Exception e)
        {
            System.err.println("Error deleting friendship: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/find-friends/{userId}")
    public ResponseEntity<List<User>> getFriendsById(@PathVariable int userId)
    {
        try
        {
            List<User> friends = userService.getFriends(userId);
            System.out.println(friends);
            return ResponseEntity.status(HttpStatus.OK).body(friends);
        }
        catch (Exception e)
        {
            System.err.println("Error finding friends: " + e.getMessage());
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
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/count-friends/{userId}")
    public ResponseEntity<Integer> countFriendships(@PathVariable int userId)
    {
        try
        {
            int count = userService.countFriendships(userId);
            return ResponseEntity.status(HttpStatus.OK).body(count);
        }
        catch (Exception e)
        {
            System.err.println("Error counting friendships: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/check-friendship/{userId1}/{userId2}")
    public ResponseEntity<Boolean> checkFriendship(@PathVariable int userId1, @PathVariable int userId2) {
        try {
            boolean areFriends = userService.checkFriendship(userId1, userId2);
            return ResponseEntity.ok(areFriends);
        } catch (Exception e) {
            System.err.println("Error checking friendship: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
