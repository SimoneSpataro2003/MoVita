package org.example.movita_backend.services.interfaces;

import org.example.movita_backend.model.Payment;

import java.util.List;

public interface IPaymentService
{
    void createCheckoutSession(Payment payment);
    List<Payment> getAllPayments();
    List<Payment> getPayments(int userId);
}
