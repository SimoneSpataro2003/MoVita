package org.example.movita_backend.exception.user;

import jakarta.xml.bind.ValidationException;

public class AuthenticationException extends ValidationException {
    public AuthenticationException(String message) {
        super(message);
    }
}
