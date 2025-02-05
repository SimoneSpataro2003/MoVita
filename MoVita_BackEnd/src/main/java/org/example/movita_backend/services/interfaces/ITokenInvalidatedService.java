package org.example.movita_backend.services.interfaces;

public interface ITokenInvalidatedService {
    void invalidateToken(String token);
    boolean isTokenInvalidated(String token);
}
