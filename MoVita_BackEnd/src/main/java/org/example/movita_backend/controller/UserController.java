package org.example.movita_backend.controller;

import org.example.movita_backend.model.Event;
import org.example.movita_backend.model.Payment;
import org.example.movita_backend.model.User;
import org.example.movita_backend.services.impl.UserService;
import org.example.movita_backend.services.interfaces.IImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController
{

    private final UserService userService;
    private final IImageService imageService;

    @Autowired
    public UserController(UserService userService, IImageService imageService)
    {
        this.userService = userService;
        this.imageService = imageService;
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

    @DeleteMapping("/delete-friendship/{userId1}/{userId2}")
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

    @GetMapping("/get-image-user/{userId}")
    public ResponseEntity<?> getUserImage(@PathVariable int userId) {
        try {
            Resource image = imageService.getUserImage(userId);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + userId + ".jpg" + "\"")
                    .header(HttpHeaders.CONTENT_TYPE, "image/jpeg")
                    .body(image);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("The event image doesn't exist");
        }
    }

    @PostMapping("/set-user-image/{userId}")
    public ResponseEntity<String> setUserImage(@RequestBody MultipartFile image,
                                               @PathVariable int userId) {
        try {
            imageService.addUserImage(userId, image);
            return ResponseEntity.ok("Image uploaded successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload image");
        }
    }

    @GetMapping("/get-created-events/{userId}")
    public ResponseEntity<List<Event>> getCreatedEventById(@PathVariable int userId)
    {
        try
        {
            List<Event> events = userService.getCreatedEventsByUserId(userId);
            return ResponseEntity.ok(events);
        }
        catch (Exception e)
        {
            return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping("/find-friends/{userId}")
    public ResponseEntity<List<User>> getFriendsById(@PathVariable int userId)
    {
        try
        {
            List<User> friends = userService.getFriends(userId);
            System.out.println("amici: " + friends);
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
            System.out.println("filter : " + filter);
            System.out.println("list friends " + friends);
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

    @PatchMapping("go-premium/{userId}")
    public ResponseEntity<Boolean> goPremium(@PathVariable int userId) {
        try
        {
            userService.updatePremiumStatus(userId);
            return ResponseEntity.ok(true);
        }
        catch (Exception e)
        {
            System.err.println("Error going premium: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PatchMapping("update-person/{userId}")
    public ResponseEntity<User> updatePerson(@PathVariable int userId, @RequestBody User user) {
        try
        {
            userService.updatePerson(userId, user);
            return ResponseEntity.ok(user);
        }
        catch (Exception e)
        {
            System.err.println("Error update person: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PatchMapping("update-agency/{userId}")
    public ResponseEntity<User> updateAgency(@PathVariable int userId, @RequestBody User user) {
        try
        {
            userService.updateAgency(userId, user);
            return ResponseEntity.ok(user);
        }
        catch (Exception e)
        {
            System.err.println("Error update agency: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
