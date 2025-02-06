import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../services/user/user.service';
import { Utente } from '../../model/Utente';

declare var google: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{
  router = inject(Router);
  errorMessage: string = '';

  applyForm = new FormGroup({
    username: new FormControl('', { validators: [Validators.required] }),
    password: new FormControl('', { validators: [Validators.required] })
  });

  constructor(private authService: AuthService,
              private cookieService: CookieService,
              private userService: UserService) {}

  login() {
    this.errorMessage = ''; // Resetta il messaggio di errore
    const body = {
      username: this.applyForm.value.username,
      password: this.applyForm.value.password
    };

    this.authService.login(body).subscribe({
      next: (body: any) => {
        this.cookieService.set('token', body.token);
        console.log(this.cookieService.get('token'));
        this.getUserByUsername();
        //this.loginError = false;
      },
      error: () => {
        this.errorMessage = 'Credenziali non valide. Riprova.';
        this.applyForm.reset();
        //this.loginError = true;
      }
    });
  }

  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: '100245284964-18vc9ql529e46ptpgtsqfl1ifu4b1ej2.apps.googleusercontent.com',
      callback: this.handleCredentialResponse.bind(this),
      auto_select: true,
      context: 'signin'
    });

    google.accounts.id.renderButton(
      document.getElementById('google-signin-button'),
      { theme: 'filled_black', size: 'large', text: 'signin_with', shape: 'pill', width: 290 }
    );

    google.accounts.id.prompt();
  }

  handleCredentialResponse(response: any) {
    const credential = response.credential;
    this.authService.loginWithGoogle(credential).subscribe({
      next:(body:any)=>{
        this.cookieService.set('token',body.token);
        this.cookieService.set('utente', JSON.stringify(body.utente))
        this.goHome();
      },
      error:(error:any)=>{
        console.error(error);
      }
    })
  }

  getUserByUsername(){
    console.log(this.applyForm.value.username);
    this.userService.getUserByUsername(this.applyForm.value.username||'').subscribe({
      next: (utente: Utente) =>{
        console.log(utente);
        this.cookieService.set('utente', JSON.stringify(utente));
        const a = JSON.parse(this.cookieService.get('utente'));
        console.log(a);
        this.goHome();
      },
      error: (any) =>{

      }
    });
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
