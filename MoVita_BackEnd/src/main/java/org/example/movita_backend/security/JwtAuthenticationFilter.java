package org.example.movita_backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.example.movita_backend.services.impl.AuthService;
import org.example.movita_backend.services.impl.JWTService;
import org.example.movita_backend.services.impl.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

// questo filtro deve essere controllato solo una volta per ogni richiesta
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JWTService jwtService;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    /*una qualsiasi http request, se si tratta di un utente autenticato, presenterà un header particolare, formato così:
    Authorization: Bearer <Token>, con <Token> indicante il token generato dal Jwt service.
     */

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");

        // se non li inizializzo dà un errore "might not have been initialized
        String token = null, username = null;

        if(StringUtils.isEmpty(authHeader) || org.apache.commons.lang3.StringUtils.startsWith(authHeader, "Bearer ")){
            filterChain.doFilter(request,response);
            return;
        }

        token = authHeader.substring(7);
        username = jwtService.extractUsername(token);

        if(org.apache.commons.lang3.StringUtils.isNotEmpty(username) && SecurityContextHolder.getContext().getAuthentication() == null){
            UserDetails utente = customUserDetailsService.loadUserByUsername(username);

            if(jwtService.isTokenValid(token, utente)){
                SecurityContext securityContext= SecurityContextHolder.createEmptyContext();
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(utente, null, utente.getAuthorities());

                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                securityContext.setAuthentication(authenticationToken);
                SecurityContextHolder.setContext(securityContext);
            }
        }

            filterChain.doFilter(request, response);

    }
}
