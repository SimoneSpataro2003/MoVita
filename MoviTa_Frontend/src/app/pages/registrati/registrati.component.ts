import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RegistratiService } from '../../services/register/registrati.service';

@Component({
  selector: 'app-registrati',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registrati.component.html',
  styleUrl: './registrati.component.css'
})
export class RegistratiComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  registratiService = inject(RegistratiService);
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
  submitApplication() {
    this.registratiService.submitApplication(
      this.applyForm.value.username ?? '',
      this.applyForm.value.eta ?? '',
      this.applyForm.value.email ?? '',
      this.applyForm.value.password ?? '',
      this.applyForm.value.ripetiPassword ?? '',
    );
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
