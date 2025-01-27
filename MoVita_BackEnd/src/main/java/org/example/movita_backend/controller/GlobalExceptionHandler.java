package org.example.movita_backend.controller;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.http.HttpServletResponse;
import org.example.movita_backend.exception.user.AuthenticationException;
import org.example.movita_backend.exception.user.UserDoesNotExist;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.resource.NoResourceFoundException;
import java.sql.SQLException;
import java.util.Map;
import java.util.stream.Collectors;


@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({MethodArgumentTypeMismatchException.class})
    public ResponseEntity<Object> handleMethodArgumentTypeMismatchException(MethodArgumentTypeMismatchException exception) {
        Map<String, Object> response = Map.of(
                "error", exception.getMessage(),
                "errorCode", HttpStatus.BAD_REQUEST.value()
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    @ExceptionHandler({MethodArgumentNotValidException.class})
    public ResponseEntity<Object> handleMethodArgumentNotValidException(MethodArgumentNotValidException exception) {
        Map<String, Object> response = Map.of(
                "error", exception.getBindingResult().getAllErrors().stream()
                        .map(DefaultMessageSourceResolvable::getDefaultMessage)
                        .collect(Collectors.toList()),
                "errorCode", HttpStatus.BAD_REQUEST.value()
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    @ExceptionHandler({UsernameNotFoundException.class})
    public ResponseEntity<Object> handleUsernameNotFoundException(UsernameNotFoundException exception) {
        Map<String, Object> response = Map.of(
                "error", exception.getMessage(),
                "errorCode", HttpStatus.BAD_REQUEST.value()
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    @ExceptionHandler({RuntimeException.class})
    public ResponseEntity<Object> handleRuntimeException(RuntimeException exception) {
        Map<String, Object> response = Map.of(
                "error", exception.getMessage(),
                "errorCode", HttpStatus.BAD_REQUEST.value()
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    @ExceptionHandler({IllegalArgumentException.class})
    public ResponseEntity<Object> handleIllegalArgumentException(IllegalArgumentException exception) {
        Map<String, Object> response = Map.of(
                "error", exception.getMessage(),
                "errorCode", HttpStatus.BAD_REQUEST.value()
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    @ExceptionHandler({ResponseStatusException.class})
    public ResponseEntity<Object> handleResponseStatusException(ResponseStatusException exception) {
        Map<String, Object> response = Map.of(
                "error", exception.getMessage(),
                "errorCode", exception.getStatusCode()
        );
        return ResponseEntity.status(exception.getStatusCode()).body(response);
    }

    @ExceptionHandler({NoResourceFoundException.class})
    public ResponseEntity<Object> handleNoResourceFoundException(NoResourceFoundException exception) {
        Map<String, Object> response = Map.of(
                "error", exception.getMessage(),
                "errorCode", HttpStatus.NOT_FOUND.value()
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    @ExceptionHandler({WebClientResponseException.class})
    public ResponseEntity<Object> handleWebClientResponseException(WebClientResponseException exception) {
        Map<String, Object> response = Map.of(
                "error", exception.getMessage(),
                "errorCode", exception.getStatusCode().value()
        );
        return ResponseEntity.status(exception.getStatusCode()).body(response);
    }


    @ExceptionHandler({SQLException.class})
    public ResponseEntity<Object> handleSQLException(SQLException exception) {
        Map<String, Object> response = Map.of(
                "error", exception.getMessage(),
                "errorCode", HttpStatus.INTERNAL_SERVER_ERROR.value()
        );
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }

    @ExceptionHandler(UserDoesNotExist.class)
    public ResponseEntity<Object> handleUserDoesNotExist(UserDoesNotExist exception) {
        Map<String, Object> response = Map.of(
                "error", exception.getMessage(),
                "errorCode", HttpStatus.NOT_FOUND.value()
        );

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }
    //TODO handler Event not valid

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGenericException(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Errore generico: " + ex.getMessage());
    }
}

