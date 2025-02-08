import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const ripetiPassword = control.get('ripetiPassword');

  //restituisci un errore se i campi esistono e i valori non coincidono
  if (password && ripetiPassword && password.value !== ripetiPassword.value) {
    return { passwordMismatch: true };
  }
  return null; //password coincidono
};

@Component({
  selector: 'app-registrati',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './registrati.component.html',
  styleUrl: './registrati.component.css'
})
export class RegistratiComponent {
  router = inject(Router);
  tipo: number = 0;
  submitted: boolean = false;

  personForm = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.pattern(/[A-Z][a-z]+/)]),
    personaCognome: new FormControl('', [Validators.required, Validators.pattern(/[A-Z][a-z]+/)]),
    username: new FormControl('', [Validators.required, Validators.pattern(/[a-zA-Z0-9]+/)]),
    email: new FormControl('', [Validators.required, Validators.pattern(/(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])/)]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
    ripetiPassword: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
    citta: new FormControl('', [Validators.required, Validators.pattern(/[a-zA-Z ]+/)]),
  }, { validators: passwordMatchValidator });

  agencyForm = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.pattern(/[A-Z][a-z]+/)]),
    username: new FormControl('', [Validators.required, Validators.pattern(/[a-zA-Z0-9]+/)]),
    email: new FormControl('', [Validators.required, Validators.pattern(/(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])/)]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
    ripetiPassword: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
    citta: new FormControl('', [Validators.required, Validators.pattern(/[a-zA-Z ]+/)]),
    aziendaIndirizzo: new FormControl('', [Validators.required, Validators.pattern(/[a-zA-z0-9 ]+/)]),
    aziendaRecapito: new FormControl('', [Validators.required, Validators.pattern(/[0-9]{10}/)]),
    aziendaPartitaIva: new FormControl('', [Validators.required, Validators.pattern(/[0-9]{11}/)])
  }, { validators: passwordMatchValidator });

  resetForms() {
    this.personForm.reset();
    this.agencyForm.reset();
    this.submitted = false;
    this.tipo = 0;
  }

  constructor(private authService: AuthService) {}

  registerUser() {
    this.submitted = true;
    if (this.personForm.invalid || this.personForm.hasError('passwordMismatch')) {
      return;
    }
    const body = {
      nome: this.personForm.value.nome,
      personaCognome: this.personForm.value.personaCognome,
      username: this.personForm.value.username,
      email: this.personForm.value.email,
      password: this.personForm.value.password,
      citta: this.personForm.value.citta
    };
    this.authService.registerUser(body).subscribe({
      next: (response: any) => {
        this.goLogin();
        console.log(response);
      },
      error: (any) => {
        console.log("errore nella registrazione dell'utente");
      }
    });
  }

  registerAgency() {
    this.submitted = true;
    if (this.agencyForm.invalid || this.agencyForm.hasError('passwordMismatch')) {
      return;
    }
    const body = {
      nome: this.agencyForm.value.nome,
      username: this.agencyForm.value.username,
      email: this.agencyForm.value.email,
      password: this.agencyForm.value.password,
      citta: this.agencyForm.value.citta,
      aziendaIndirizzo: this.agencyForm.value.aziendaIndirizzo,
      aziendaRecapito: this.agencyForm.value.aziendaRecapito,
      aziendaPartitaIva: this.agencyForm.value.aziendaPartitaIva
    };
    this.authService.registerAgency(body).subscribe({
      next: (response: any) => {
        this.goLogin();
        console.log(response);
      },
      error: (any) => {
        console.log("errore nella registrazione dell'agenzia");
      }
    });
  }

  goLogin() {
    this.router.navigate(['/login']);
  }
}
