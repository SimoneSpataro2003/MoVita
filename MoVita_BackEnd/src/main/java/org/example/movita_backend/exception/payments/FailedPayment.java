package org.example.movita_backend.exception.payments;

public class FailedPayment extends RuntimeException {
    public FailedPayment(String message) {
        super(message);
    }
}
