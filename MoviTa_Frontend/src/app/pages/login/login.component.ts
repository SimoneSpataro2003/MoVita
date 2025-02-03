import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';
import {CookieService} from 'ngx-cookie-service';
import {UserService} from '../../services/user/user.service';
import {Utente} from '../../model/Utente';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  router = inject(Router);

  applyForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private authService: AuthService,
              private cookieService: CookieService,
              private userService: UserService){}

  login(){
    const body = {
      username: this.applyForm.value.username,
      password: this.applyForm.value.password
    };

    this.authService.login(body).subscribe({
      next: (body:any) =>{
        this.cookieService.set('token', body.token);
        console.log(this.cookieService.get('token'));
        this.getUser();
      },
      error: (any) =>{
        //TODO: mostra popup di errore
      }
    });
  }

  getUser(){
    this.userService.getUserByUsername(this.applyForm.value.username||'').subscribe({
      next: (utente: Utente) =>{
        console.log(utente);
        this.cookieService.set('utente', JSON.stringify(utente));
        const a = JSON.parse(this.cookieService.get('utente'));
        console.log(a);
        this.goHome();
      },
      error: (any) =>{
        //TODO: mostra popup di errore
      }
    });
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
