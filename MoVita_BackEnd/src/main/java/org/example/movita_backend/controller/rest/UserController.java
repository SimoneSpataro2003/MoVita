package org.example.movita_backend.controller.rest;

import jakarta.servlet.http.HttpServletRequest;
import org.example.movita_backend.exception.user.AuthenticationException;
import org.example.movita_backend.persistence.DBManager;
import org.example.movita_backend.persistence.model.Payment;
import org.example.movita_backend.persistence.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(value = "http://localhost:4200/")
public class UserController {

    @GetMapping("/user/friends")
    public ResponseEntity<List<User>> getFriends(HttpServletRequest request) throws AuthenticationException {
        User user = (User) request.getSession().getAttribute("user");

        // vari controlli di questo tipo...
        if(user == null) {
            throw new AuthenticationException("Non sei autorizzato!");
        }

        return ResponseEntity.ok(user.getFriends());
    }

    @GetMapping("user/payment/{userId}")
    public ResponseEntity<List<Payment>> getPaymentByUserId(@PathVariable int userId) {
        List<Payment> payments = DBManager.getInstance().getPaymentDAO().getPaymentsByUserId(userId);
        return ResponseEntity.ok(payments);
    }
}
