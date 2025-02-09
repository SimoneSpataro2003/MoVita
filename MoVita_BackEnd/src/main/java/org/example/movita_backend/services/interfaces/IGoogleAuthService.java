package org.example.movita_backend.services.interfaces;

public interface IGoogleAuthService {
    public String verifyTokenAndGetEmail(String idTokenString);
}
