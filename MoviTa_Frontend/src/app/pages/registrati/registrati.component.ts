import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';
import {CookieService} from 'ngx-cookie-service';

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
    partitaIVA: new FormControl(''),
  });

  constructor(private authService: AuthService) {}

  registerUser() {
    const body = {
      username: this.applyForm.value.username,
      email: this.applyForm.value.email,
      password: this.applyForm.value.password,
      citta: this.applyForm.value.citta,
      nome: this.applyForm.value.nome,
      cognome: this.applyForm.value.cognome,
    };
    this.authService.registerUser(body).subscribe({
      next: (response: any) => {
        this.registerError = false;
        this.goLogin();
        console.log(response);
      },
      error: (any) => {
        this.registerError = true;
        this.applyForm.reset();
      }
    });
  }

  registerAgency() {
    const body = {
      username: this.applyForm.value.username,
      email: this.applyForm.value.email,
      password: this.applyForm.value.password,
      citta: this.applyForm.value.citta,
      nome: this.applyForm.value.nome,
      partitaIVA: this.applyForm.value.partitaIVA,
      indirizzo: this.applyForm.value.indirizzo,
      recapito: this.applyForm.value.recapito
    };
    this.authService.registerAgency(body).subscribe({
      next: (response: any) => {
        this.registerError = false;
        this.goLogin();
        console.log(response);
      },
      error: (any) => {
        this.registerError = true;
        this.applyForm.reset();
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
