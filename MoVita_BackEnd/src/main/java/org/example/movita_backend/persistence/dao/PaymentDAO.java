package org.example.movita_backend.persistence.dao;

import org.example.movita_backend.persistence.model.Payment;

import java.util.List;

public interface PaymentDAO {
    List<Payment> getPaymentsByUserId(int userId);
}
