package org.example.movita_backend.controller;

import org.example.movita_backend.model.User;
import org.example.movita_backend.services.impl.UserService;
import org.example.movita_backend.services.interfaces.IImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

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

    @GetMapping("/get-image-user/{userId}")
    public ResponseEntity<?> getUserImage(@PathVariable int userId)
    {
        try
        {
             return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + userId + ".jpg\"")
                .header(HttpHeaders.CONTENT_TYPE, "image/jpeg")
                .body(imageService.getUserImage(userId));
        }
        catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("The user image doesn't exist");
        }
    }


    @PostMapping("/set-user-image/{userId}")
    public ResponseEntity<String> createUserImage(@PathVariable int userId, @RequestBody MultipartFile image)
    {
        try {
            imageService.addUserImage(userId,image);
            return ResponseEntity.ok("Image uploaded successfully");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload image");
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
            e.printStackTrace();
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
}
