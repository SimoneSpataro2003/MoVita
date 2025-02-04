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
  registerError: boolean = false;

  applyForm = new FormGroup({
    nome: new FormControl(''),
    cognome: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    ripetiPassword: new FormControl(''),
    citta: new FormControl(''),
    indirizzo: new FormControl(''),
    recapito: new FormControl(''),
    partitaIva: new FormControl(''),
  });

  constructor(private authService: AuthService) {}

  registerUser() {
    const body = {
      nome: this.applyForm.value.nome,
      cognome: this.applyForm.value.cognome,
      username: this.applyForm.value.username,
      email: this.applyForm.value.email,
      password: this.applyForm.value.password,
      citta: this.applyForm.value.citta
    };
    this.authService.registerUser(body).subscribe({
      next: (response: any) => {
        this.goLogin();
        console.log(response);
        this.registerError = false;
      },
      error: (any) => {
        //TODO: errore
        //this.applyForm.reset();
        this.registerError = true;
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
      indirizzo: this.applyForm.value.indirizzo,
      recapito: this.applyForm.value.recapito,
      partitaIva: this.applyForm.value.partitaIva
    };
    this.authService.registerAgency(body).subscribe({
      next: (response: any) => {
        this.goLogin();
        console.log(response);
      },
      error: (any) => {
        //TODO: errore
        //this.applyForm.reset();
        this.registerError = true;
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
