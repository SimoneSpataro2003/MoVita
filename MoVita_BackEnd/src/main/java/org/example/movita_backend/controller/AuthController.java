package org.example.movita_backend.controller;

import jakarta.validation.Valid;
import org.example.movita_backend.model.dto.LoginRequest;
import org.example.movita_backend.model.dto.RegisterAgencyRequest;
import org.example.movita_backend.model.dto.RegisterPersonRequest;
import org.example.movita_backend.services.impl.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
}
