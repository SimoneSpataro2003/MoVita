package org.example.movita_backend.controller;

import jakarta.validation.Valid;
import org.example.movita_backend.model.User;
import org.example.movita_backend.security.dto.JwtAuthenticationResponse;
import org.example.movita_backend.security.dto.LoginRequest;
import org.example.movita_backend.security.dto.RegisterAgencyRequest;
import org.example.movita_backend.security.dto.RegisterPersonRequest;
import org.example.movita_backend.services.impl.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {
    @Autowired
    AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest){
        return ResponseEntity.ok(authService.login(loginRequest));
    }

    @PostMapping("/register-person")
    public ResponseEntity<?> registerPerson(@Valid @RequestBody RegisterPersonRequest registerPersonRequest) {
        User registered = authService.registerPerson(registerPersonRequest);
        return ResponseEntity.ok(registered);
    }

    @PostMapping("/register-agency")
    public ResponseEntity<?> registerAgency(@Valid @RequestBody RegisterAgencyRequest registerAgencyRequest) {
        return ResponseEntity.ok(authService.registerAgency(registerAgencyRequest));
    }
}
