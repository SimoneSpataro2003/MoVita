package org.example.movita_backend.persistence.dao;

import org.example.movita_backend.model.User;

import java.util.List;

public interface UserDao {
    void createPerson(User user);
    void createAgency(User user);
    User findById(int id);
    User findByUsername(String username);
    User findByEmail(String email);
    List<User> findAll();
    List<User> findPremiumUsers();
    void deleteById(int id);
    //update generici, che modificano dati anagrafici.
    User updatePerson(User user);
    User updateAgency(User user);
    //update specifici, che necessitano di operazioni aggiuntive separate.
    User updatePremiumStatus(int userId);
    User updatePassword(int userId, String newPassword);
    User updateProfileImage(int userId, String imagePath);
    User updateConsigliEventi(int userId);

    //TODO: ALTRI
    //associazioni
}
