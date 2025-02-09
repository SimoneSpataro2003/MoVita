import { Component, inject, OnInit } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../services/user/user.service';
import { Utente } from '../../model/Utente';
import {ToastService} from '../../services/toast/toast.service';

declare var google: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, NgOptimizedImage],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  router = inject(Router);
  errorMessage: string = '';
  showPassword: boolean = false;

  applyForm = new FormGroup({
    username: new FormControl('', { validators: [Validators.required] }),
    password: new FormControl('', { validators: [Validators.required] })
  });

  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private userService: UserService,
    private toastService: ToastService
  ) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  clearError() {
    this.errorMessage = '';
  }

  login() {
    this.clearError();
    const body = {
      username: this.applyForm.value.username,
      password: this.applyForm.value.password
    };

    this.authService.login(body).subscribe({
      next: (body: any) => {
        this.cookieService.set('token', body.token);
        console.log(this.cookieService.get('token'));
        this.toastService.show('successToast', 'Successo!', "Login effettuato con successo!");
        this.getUserByUsername();
      },
      error: (err) =>{
        this.applyForm.reset();
        console.log(err.error.error);
        this.toastService.show('errorToast', 'Errore', err.error.error);
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
        this.toastService.show('successToast', 'Successo!', "Login effettuato con successo!");
        this.goHome();
      },
      error:(err:any)=>{
        this.toastService.show('errorToast', 'Errore', 'Nessun utente è registrato con questo profilo Google.');
      }
    });
  }

  getUserByUsername() {
    console.log(this.applyForm.value.username);
    this.userService.getUserByUsername(this.applyForm.value.username || '').subscribe({
      next: (utente: Utente) => {
        console.log(utente);
        this.cookieService.set('utente', JSON.stringify(utente));
        const a = JSON.parse(this.cookieService.get('utente'));
        this.goHome();
      },
      error: (any) =>{
        this.toastService.show('errorToast',"Errore", "Impossibile Caricare l'utente. \n Prova a ricaricare la pagina.");
      }
    });
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
