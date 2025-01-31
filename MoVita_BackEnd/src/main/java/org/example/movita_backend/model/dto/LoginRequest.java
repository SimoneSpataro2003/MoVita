package org.example.movita_backend.model.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
public class LoginRequest{
    @NotBlank(message = "Username shouldn't be empty")
    private String username;

    @NotBlank(message = "Password shouldn't be empty")
    private String password;
}
