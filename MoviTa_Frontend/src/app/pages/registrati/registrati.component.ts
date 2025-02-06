import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-registrati',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registrati.component.html',
  styleUrl: './registrati.component.css'
})
export class RegistratiComponent {
  router = inject(Router);
  tipo: number = 0;
  //registerError: boolean = false;

  applyForm = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.pattern(/[A-Z][a-z]+/)]),
    personaCognome: new FormControl('', [Validators.required, Validators.pattern(/[A-Z][a-z]+/)]),
    username: new FormControl('', [Validators.required, Validators.pattern(/[a-zA-Z0-9]+/)]),
    email: new FormControl('', [Validators.required, Validators.pattern(/(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])/)]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
    ripetiPassword: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
    citta: new FormControl('', [Validators.required, Validators.pattern(/[a-zA-Z ]+/)]),
    aziendaIndirizzo: new FormControl('', [Validators.required, Validators.pattern(/[a-zA-z0-9 ]+/)]),
    aziendaRecapito: new FormControl('', [Validators.required, Validators.pattern(/[0-9]{10}/)]),
    aziendaPartitaIva: new FormControl('', [Validators.required, Validators.pattern(/[0-9]{11}/)])
  });

  constructor(private authService: AuthService) {}

  registerUser() {
    const body = {
      nome: this.applyForm.value.nome,
      personaCognome: this.applyForm.value.personaCognome,
      username: this.applyForm.value.username,
      email: this.applyForm.value.email,
      password: this.applyForm.value.password,
      citta: this.applyForm.value.citta
    };
    this.authService.registerUser(body).subscribe({
      next: (response: any) => {
        this.goLogin();
        console.log(response);
        //this.registerError = false;
      },
      error: (any) => {
        //TODO: errore
        //this.applyForm.reset();
        //this.registerError = true;
      }
    });
  }

  registerAgency() {
    const body = {
      nome: this.applyForm.value.nome,
      username: this.applyForm.value.username,
      email: this.applyForm.value.email,
      password: this.applyForm.value.password,
      citta: this.applyForm.value.citta,
      aziendaIndirizzo: this.applyForm.value.aziendaIndirizzo,
      aziendaRecapito: this.applyForm.value.aziendaRecapito,
      aziendaPartitaIva: this.applyForm.value.aziendaPartitaIva
    };
    this.authService.registerAgency(body).subscribe({
      next: (response: any) => {
        this.goLogin();
        console.log(response);
        //this.registerError = false;
      },
      error: (any) => {
        //TODO: errore
        //this.applyForm.reset();
        //this.registerError = true;
      }
    });
  }

  goHome() {
    this.router.navigate(['/']);
  }

  goLogin() {
    this.router.navigate(['/login']);
  }
}
