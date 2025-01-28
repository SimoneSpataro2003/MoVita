package org.example.movita_backend.services.interfaces;

import org.example.movita_backend.model.User;
import org.example.movita_backend.security.dto.LoginRequest;
import org.example.movita_backend.security.dto.RegisterAgencyRequest;
import org.example.movita_backend.security.dto.RegisterPersonRequest;

public interface IAuthService {
    //registrazioni
    User registerPerson(RegisterPersonRequest request);
    User registerAgency(RegisterAgencyRequest request);

    String login(LoginRequest loginRequest);

    public void logout(String token);
}
