package org.example.movita_backend.model;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


import java.awt.desktop.UserSessionEvent;
import java.util.Collection;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class User implements UserDetails {
    protected int id;
    protected String username;
    protected String email;
    protected String password;
    protected String nome;
    protected String immagineProfilo;
    protected String citta;
    protected boolean azienda;
    protected String personaCognome;
    protected String aziendaPartitaIva;
    protected String aziendaIndirizzo;
    protected String aziendaRecapito;
    protected boolean premium;
    protected String premiumDataInizio;
    protected String premiumDataFine;
    protected boolean admin;
    protected String dataCreazione;
    protected String dataUltimaModifica;
    protected boolean mostraConsigliEventi;

    // Relations
    protected List<User> amici;
    protected List<Category> categorieInteressate;
    //private List<???> eventiPartecipati;
    //private List<???> eventiRecensiti;
    //FIXME: eventiCercati e utentiCercati richiedono due tabelle apposite nel db!
    //private List<???> eventiCreati;
    protected List<User> utentiCercati;
    protected List<Payment> pagamenti;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(getRuolo()));
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    private String getRuolo(){
        if(admin)
            return "admin";
        else
            return "user";
    }
}

