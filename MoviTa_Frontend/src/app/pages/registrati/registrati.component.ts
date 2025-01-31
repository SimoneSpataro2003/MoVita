import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registrati',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registrati.component.html',
  styleUrl: './registrati.component.css'
})
export class RegistratiComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  tipo:number = 0;

  applyForm = new FormGroup({
    username: new FormControl(''),
    eta: new FormControl(),
    email: new FormControl(''),
    password: new FormControl(''),
    ripetiPassword: new FormControl('')
  });

  constructor() {
    //costruttore
  }
  //TODO: utente e azienda

  goHome() {
    this.router.navigate(['/']);
  }
}
