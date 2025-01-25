package org.example.movita_backend.security.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.*;

@Getter
public class RegisterPersonRequest extends RegisterUserRequest{

    @NotBlank(message = "Surname shouldn't be empty")
    @Pattern(regexp = "[A-Z][a-z]+", message = "Surname is not valid. Only alphanumeric characters are allowed.")
    String cognome;
}
