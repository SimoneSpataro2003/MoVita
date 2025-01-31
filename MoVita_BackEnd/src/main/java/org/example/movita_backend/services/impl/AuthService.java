package org.example.movita_backend.services.impl;

import org.example.movita_backend.exception.user.EmailAlreadyExists;
import org.example.movita_backend.exception.user.UserDoesNotExist;
import org.example.movita_backend.exception.user.UsernameAlreadyExists;
import org.example.movita_backend.model.User;
import org.example.movita_backend.persistence.DBManager;
import org.example.movita_backend.persistence.dao.UserDao;
import org.example.movita_backend.model.dto.LoginRequest;
import org.example.movita_backend.model.dto.RegisterAgencyRequest;
import org.example.movita_backend.model.dto.RegisterPersonRequest;
import org.example.movita_backend.services.interfaces.IAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AuthService implements IAuthService {

    private final UserDao userDao;

    public AuthService(){
        this.userDao = DBManager.getInstance().getUserDAO();
    }

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTService jwtService;

    private void emailAlreadyExists(String email){
        User user = userDao.findByEmail(email);
        if(user != null){
            throw new EmailAlreadyExists("email already exists");
        }
    }

    private void usernameAlreadyExists(String username){
        User user = userDao.findByUsername(username);

        if(user != null){
            throw new UsernameAlreadyExists("username already exists");
        }
    }

    private void userDoesNotExists(String username){
        User user = userDao.findByUsername(username);
        if(user == null){
            throw new UserDoesNotExist("username doesn't exist");
        }
    }

    @Override
    public User registerPerson(RegisterPersonRequest registerPersonRequest) {
        usernameAlreadyExists(registerPersonRequest.getUsername());
        emailAlreadyExists(registerPersonRequest.getEmail());

        User newUser = new User();

        newUser.setUsername(registerPersonRequest.getUsername());
        newUser.setEmail(registerPersonRequest.getEmail());
        newUser.setPassword(passwordEncoder.encode(registerPersonRequest.getPassword()));
        newUser.setCitta(registerPersonRequest.getCitta());
        newUser.setNome(registerPersonRequest.getNome());
        newUser.setAzienda(false);
        newUser.setPersonaCognome(registerPersonRequest.getCognome());
        newUser.setPremium(false);
        newUser.setAdmin(false);
        newUser.setMostraConsigliEventi(true);

        this.userDao.createPerson(newUser);

        return newUser;
    }

    @Override
    public User registerAgency(RegisterAgencyRequest registerAgencyRequest) {
        usernameAlreadyExists(registerAgencyRequest.getUsername());
        emailAlreadyExists(registerAgencyRequest.getEmail());

        User newUser = new User();

        newUser.setUsername(registerAgencyRequest.getUsername());
        newUser.setEmail(registerAgencyRequest.getEmail());
        newUser.setPassword(passwordEncoder.encode(registerAgencyRequest.getPassword()));
        newUser.setCitta(registerAgencyRequest.getCitta());
        newUser.setNome(registerAgencyRequest.getNome());
        newUser.setAzienda(true);
        newUser.setAziendaPartitaIva(registerAgencyRequest.getPartitaIva());
        newUser.setAziendaIndirizzo(registerAgencyRequest.getIndirizzo());
        newUser.setAziendaRecapito(registerAgencyRequest.getRecapito());
        newUser.setPremium(false);
        newUser.setAdmin(false);
        newUser.setMostraConsigliEventi(true);

        this.userDao.createPerson(newUser);

        return newUser;
    }

    @Override
    public String login(LoginRequest loginRequest) {
        userDoesNotExists(loginRequest.getUsername());
        System.out.println("ok");

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),loginRequest.getPassword()));

        User user = userDao.findByUsername(loginRequest.getUsername());

        return jwtService.generateToken(user);
    }

    @Override
    public void logout(String token) {

    }
}
