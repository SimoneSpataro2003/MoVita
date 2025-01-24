package org.example.movita_backend.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.example.movita_backend.exception.user.AuthenticationException;
import org.example.movita_backend.persistence.DBManager;
import org.example.movita_backend.model.Payment;
import org.example.movita_backend.model.User;
import org.example.movita_backend.services.impl.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(value = "http://localhost:4200/")
public class UserController {

    @Autowired
    AuthService authService;

    @GetMapping("/user/friends")
    public ResponseEntity<List<User>> getFriends(HttpServletRequest request) throws AuthenticationException {
        User user = (User) request.getSession().getAttribute("user");

        // vari controlli di questo tipo...
        if(user == null)
        {
            throw new AuthenticationException("Non sei autorizzato!");
        }

        return ResponseEntity.ok(user.getAmici());
    }



    @GetMapping("user/payment/")
    public ResponseEntity<List<Payment>> getPayment(HttpServletRequest request) throws AuthenticationException  {
        User user = (User) request.getSession().getAttribute("user");

        // vari controlli di questo tipo...
        if(user == null)
        {
            throw new AuthenticationException("Non sei autorizzato!");
        }

        return ResponseEntity.ok(user.getPagamenti());
    }
}
