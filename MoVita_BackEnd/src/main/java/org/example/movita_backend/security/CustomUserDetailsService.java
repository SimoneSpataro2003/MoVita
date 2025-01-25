package org.example.movita_backend.security;

import org.example.movita_backend.model.User;
import org.example.movita_backend.persistence.DBManager;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User u = DBManager.getInstance().getUserDAO().findByUsername(username);
        if (u == null) {
            throw new UsernameNotFoundException(username);
        }
        return u;
    }
}
