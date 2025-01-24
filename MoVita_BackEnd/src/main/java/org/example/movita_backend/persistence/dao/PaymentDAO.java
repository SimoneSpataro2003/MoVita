package org.example.movita_backend.persistence.dao;

import org.example.movita_backend.model.Payment;

import java.util.List;

public interface PaymentDAO {
    void addPayment(Payment payment);
    void clearAllPayments();
}
