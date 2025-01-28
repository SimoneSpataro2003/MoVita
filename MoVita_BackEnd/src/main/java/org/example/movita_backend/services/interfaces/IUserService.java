package org.example.movita_backend.services.interfaces;

import org.example.movita_backend.model.User;

public interface IUserService {
    User findByUsername(String username);

}
