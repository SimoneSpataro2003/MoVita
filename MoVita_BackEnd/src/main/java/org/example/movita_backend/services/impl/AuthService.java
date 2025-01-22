package org.example.movita_backend.services.impl;

import org.example.movita_backend.exception.user.EmailAlreadyExists;
import org.example.movita_backend.exception.user.UserDoesNotExist;
import org.example.movita_backend.exception.user.UsernameAlreadyExists;
import org.example.movita_backend.model.User;
import org.example.movita_backend.persistence.DBManager;
import org.example.movita_backend.persistence.dao.UserDao;
import org.example.movita_backend.services.interfaces.IAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService implements IAuthService {

    private final UserDao userDao;

    public AuthService(){
        this.userDao = DBManager.getInstance().getUserDAO();
    }

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;


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
    public User registerPerson(String username, String email, String password, String citta, String nome, String cognome) {
        usernameAlreadyExists(username);
        emailAlreadyExists(email);

        User newUser = new User();

        newUser.setUsername(username);
        newUser.setEmail(email);
        newUser.setPassword(passwordEncoder.encode(password));
        newUser.setCitta(citta);
        newUser.setNome(nome);
        newUser.setAzienda(false);
        newUser.setPersonaCognome(cognome);
        newUser.setPremium(false);
        newUser.setAdmin(false);
        newUser.setMostraConsigliEventi(true);

        this.userDao.createPerson(newUser);

        return newUser;
    }

    @Override
    public User registerAgency(String username, String email, String password, String citta, String nome,String partitaIva, String indirizzo, String recapito) {
        usernameAlreadyExists(username);
        emailAlreadyExists(email);

        User newUser = new User();

        newUser.setUsername(username);
        newUser.setEmail(email);
        newUser.setPassword(passwordEncoder.encode(password));
        newUser.setCitta(citta);
        newUser.setNome(nome);
        newUser.setAzienda(true);
        newUser.setAziendaPartitaIva(partitaIva);
        newUser.setAziendaIndirizzo(indirizzo);
        newUser.setAziendaRecapito(recapito);
        newUser.setPremium(false);
        newUser.setAdmin(false);
        newUser.setMostraConsigliEventi(true);

        this.userDao.createPerson(newUser);

        return newUser;
    }

    @Override
    public String login(String username, String password) {
        usernameAlreadyExists(username);
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username,password));

        if(authentication.isAuthenticated()){
            return jwtService.generateToken(username);
        }
    }

    @Override
    public void logout(String token) {

    }
}
