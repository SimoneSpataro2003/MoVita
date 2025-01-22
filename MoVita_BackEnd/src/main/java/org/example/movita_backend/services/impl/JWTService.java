package org.example.movita_backend.services.impl;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.impl.lang.Function;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JWTService implements JWTService{

    private String secretKey;
    private int expiration;

    public JWTService() {
        try {
            // le seguenti istruzioni generano una chiave sicura e la convertono in stringa
            KeyGenerator keyGenerator = KeyGenerator.getInstance("HmacSHA256");
            SecretKey generated = keyGenerator.generateKey();
            secretKey = Base64.getEncoder().encodeToString(generated.getEncoded());
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }

        expiration = 1000 * 60 * 60 * 24; //valido per un giorno.
    }

    private String generateToken(UserDetails userDetails) {

        Map<String, Object> claims = new HashMap<>();

        return Jwts.builder().
                claims().
                add(claims).
                subject(userDetails.getUsername()).
                issuedAt(new Date(System.currentTimeMillis())).
                expiration(new Date(System.currentTimeMillis() + expiration))
                .and()
                .signWith(getKey())
                .compact();

    }

    //decodifico la chiave segreta generata nel costruttore.
    private SecretKey getKey() {
        byte[] keyBytes = Base64.getDecoder().decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    private <T> T exctractClaim(String token, Function<Claims, T> claimsExtractor) {
        Claims claim = exctractAllClaims(token);
        return claimsExtractor.apply(claim);
    }

    private Claims exctractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token).getPayload();
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return exctractClaim(token, Claims::getExpiration);
    }

    public String getUsernameFromToken(String token) {
        return exctractClaim(token, Claims::getSubject);
    }

    public boolean validateToken(String token, UserDetails utente) {
        String username = getUsernameFromToken(token);
        return username.equals(utente.getUsername()) && !isTokenExpired(token);
    }

    public String extractUsername(String token) {
        return exctractClaim(token, Claims::getSubject);
    }
}
