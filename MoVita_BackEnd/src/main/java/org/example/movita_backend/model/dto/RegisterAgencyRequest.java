package org.example.movita_backend.model.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;

@Getter
public class RegisterAgencyRequest extends RegisterUserRequest{
    @NotBlank(message = "Partita IVA shouldn't be empty")
    @Pattern(regexp = "[0-9]{11}", message = "Partita IVA is not valid. Only numeric characters are allowed.")
    String partitaIva;

    @NotBlank(message = "Address shouldn't be empty")
    @Pattern(regexp = "[a-zA-z0-9 ]+", message = "Address is not valid. Only numeric characters are allowed.")
    String indirizzo;

    @NotBlank(message = "Phone number shouldn't be empty")
    @Pattern(regexp = "[0-9]{10}", message = "Phone number is not valid. Only numeric characters are allowed.")
    String recapito;
}
