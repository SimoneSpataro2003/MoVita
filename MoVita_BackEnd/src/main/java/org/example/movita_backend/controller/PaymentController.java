package org.example.movita_backend.controller;

import org.example.movita_backend.exception.payments.FailureToObtainPayments;
import org.example.movita_backend.model.Payment;
import org.example.movita_backend.services.impl.PaymentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping("/create-payment")
    public ResponseEntity<String> createPaymentIntent(@RequestBody Payment payment) {
        try
        {
            paymentService.createCheckoutSession(payment);
            return ResponseEntity.status(HttpStatus.CREATED).body("Payment intent created successfully.");
        }
        catch (Exception e)
        {
           throw new FailureToObtainPayments(e.getMessage());
        }
    }

    @GetMapping("/get-all-payments")
    public ResponseEntity<List<Payment>> getAllPayments()
    {
        try
        {
            List<Payment> payments = paymentService.getAllPayments();
            return ResponseEntity.ok(payments);
        }
        catch (Exception e)
        {
            throw new FailureToObtainPayments(e.getMessage());
        }
    }

    @GetMapping("/get-Payments/{userId}")
    public ResponseEntity<List<Payment>> getAllPaymentsByUserId(@PathVariable int userId) {
        try
        {
            List<Payment> payments = paymentService.getPaymentsById(userId);
            return ResponseEntity.ok(payments);
        }
        catch (Exception e)
        {
            System.out.println("Error fetching payments for user " + userId + ": " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
