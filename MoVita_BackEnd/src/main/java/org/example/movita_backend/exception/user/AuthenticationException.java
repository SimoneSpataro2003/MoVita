package org.example.movita_backend.exception.user;

import org.example.movita_backend.exception.ValidationHandler;

public class AuthenticationException extends ValidationHandler {
    public AuthenticationException(String message) {
        super(message);
    }
}

