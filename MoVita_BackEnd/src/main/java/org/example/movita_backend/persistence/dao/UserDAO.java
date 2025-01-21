package org.example.movita_backend.persistence.dao;

import org.example.movita_backend.model.User;

public interface UserDAO {
    User getUserById(int id);
}
