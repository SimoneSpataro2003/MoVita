package org.example.movita_backend.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.example.movita_backend.model.User;
import org.example.movita_backend.model.dto.LoginRequest;
import org.example.movita_backend.model.dto.RegisterAgencyRequest;
import org.example.movita_backend.model.dto.RegisterPersonRequest;
import org.example.movita_backend.services.impl.AuthService;
import org.example.movita_backend.services.impl.GoogleAuthService;
import org.example.movita_backend.services.impl.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {
    @Autowired
    AuthService authService;

    @Autowired
    GoogleAuthService googleAuthService;

    @Autowired
    UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest){
        String token = authService.login(loginRequest);
        return ResponseEntity.ok().body(Map.of("token",token));
    }

    @PostMapping("/register-person")
    public ResponseEntity<?> registerPerson(@Valid @RequestBody RegisterPersonRequest registerPersonRequest) {
        return ResponseEntity.ok(authService.registerPerson(registerPersonRequest));
    }

    @PostMapping("/register-agency")
    public ResponseEntity<?> registerAgency(@Valid @RequestBody RegisterAgencyRequest registerAgencyRequest) {
        return ResponseEntity.ok(authService.registerAgency(registerAgencyRequest));
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            authService.logout(token);
        }
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login-google")
    public ResponseEntity<?> loginWithGoogle(@RequestBody Map<String, String> request) {
        // Verifica il token Google e ottieni l'email
        String email = googleAuthService.verifyTokenAndGetEmail(request.get("credential"));

        if (email == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token non valido");
        }

        // Cerca l'utente nel DB (oppure crealo, se necessario)
        User user = userService.getUserByEmail(email);
        if (user == null) {
            // Se l'utente non esiste, puoi decidere di crearlo o restituire un errore
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Utente non trovato");
        }

        // Genera il JWT token per l'utente
        String token = authService.generateJwtToken(user);

        // Restituisci il token al frontend
        return ResponseEntity.ok(Map.of("token", token,"utente",user));
    }
}

