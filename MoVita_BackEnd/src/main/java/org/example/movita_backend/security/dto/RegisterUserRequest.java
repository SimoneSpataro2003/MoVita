package org.example.movita_backend.security.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;

@Getter
public class RegisterUserRequest {
    @NotBlank(message = "Username shouldn't be empty")
    @Pattern(regexp = "[a-zA-Z0-9]+", message = "Username is not valid. Only alphanumeric characters are allowed.")
    String username;

    @NotBlank(message = "Email shouldn't be empty")
    @Pattern(regexp = "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])", message = "invalid email")
    String email;

    @NotBlank(message = "Password shouldn't be empty")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$", message = "password not valid: minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character")
    String password;

    @NotBlank(message = "City shouldn't be empty")
    @Pattern(regexp = "[a-zA-Z ]+", message = "City is not valid. Only alphanumeric characters are allowed.")
    String citta;

    @NotBlank(message = "Name shouldn't be empty")
    @Pattern(regexp = "[A-Z][a-z]+", message = "Name is not valid. Only alphanumeric characters are allowed.")
    String nome;
}
