package org.example.movita_backend.exception.payments;

public class FailureToObtainPayments extends RuntimeException {
    public FailureToObtainPayments(String message) {
        super(message);
    }
}
