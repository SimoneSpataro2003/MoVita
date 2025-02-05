package org.example.movita_backend.services.impl;

import org.example.movita_backend.services.interfaces.ITokenInvalidatedService;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class TokenInvalidatedService implements ITokenInvalidatedService {
    private Set<String> invalidTokens = new HashSet<>();

    @Override
    public void invalidateToken(String token) {
        invalidTokens.add(token);
    }

    @Override
    public boolean isTokenInvalidated(String token) {
        return invalidTokens.contains(token);
    }
}
