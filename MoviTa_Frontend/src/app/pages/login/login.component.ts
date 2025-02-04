import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
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
  //loginError: boolean = false;

  applyForm = new FormGroup({
    username: new FormControl('', {validators: [Validators.required]}),
    password: new FormControl('', {validators: [Validators.required]})
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
        //this.loginError = false;
      },
      error: (any) =>{
        this.applyForm.reset();
        //this.loginError = true;
      }
    });
  }

  getUser(){
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
