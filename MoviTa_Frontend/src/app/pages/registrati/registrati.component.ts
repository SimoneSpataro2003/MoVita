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
  tipo: number = 0; // Inizializzazione

  applyForm = new FormGroup({
    username: new FormControl('', {validators: [Validators.required]}),
    email: new FormControl('', {validators: [Validators.required]}),
    password: new FormControl('', {validators: [Validators.required]}),
    ripetiPassword: new FormControl('', {validators: [Validators.required]}),
    indirizzo: new FormControl(''),
    recapito: new FormControl(''),
    partitaIVA: new FormControl(''),
  });

  constructor(private authService: AuthService,
              private cookieService: CookieService) {}

  registerUser() {
    const body = {
      username: this.applyForm.value.username,
      email: this.applyForm.value.email,
      password: this.applyForm.value.password,
      //ripetiPassword: this.applyForm.value.ripetiPassword
    };
    this.authService.registerUser(body).subscribe({
      next: (response: any) => {
        //FIXME(SIMONE): il token viene restuito solamente al login!
        //this.cookieService.set('token', response.token);
        //console.log(this.cookieService.get('token'));
        //this.goHome();
        console.log(response);
      },
      error: (any) => {
        //TODO: mostra popup di errore
      }
    });
  }

  registerAgency() {
    const body = {
      username: this.applyForm.value.username,
      email: this.applyForm.value.email,
      password: this.applyForm.value.password,
      ripetiPassword: this.applyForm.value.ripetiPassword,
      indirizzo: this.applyForm.value.indirizzo,
      recapito: this.applyForm.value.recapito,
      partitaIVA: this.applyForm.value.partitaIVA
    };
    this.authService.registerAgency(body).subscribe({
      next: (response: any) => {
        //FIXME(SIMONE): il token viene restuito solamente al login!
        //this.cookieService.set('token', response.token);
        //console.log(this.cookieService.get('token'));
        //this.goHome();
        console.log(response);
      },
      error: (any) => {
        //TODO: mostra popup di errore
      }
    });
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
