package org.example.movita_backend.services.impl;


import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import org.example.movita_backend.services.interfaces.IGoogleAuthService;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class GoogleAuthService implements IGoogleAuthService {
    private static final String CLIENT_ID = "100245284964-18vc9ql529e46ptpgtsqfl1ifu4b1ej2.apps.googleusercontent.com";

    private final GoogleIdTokenVerifier verifier;

    public GoogleAuthService() {
        JsonFactory jsonFactory = GsonFactory.getDefaultInstance();
        this.verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), jsonFactory)
                .setAudience(Collections.singletonList(CLIENT_ID))
                .build();
    }

    @Override
    public String verifyTokenAndGetEmail(String idTokenString) {
        try {
            GoogleIdToken idToken = verifier.verify(idTokenString);
            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();
                return payload.getEmail();
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return null; // Token non valido
    }
}
