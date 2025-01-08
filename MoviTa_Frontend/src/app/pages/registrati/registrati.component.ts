import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RegistratiService } from '../../registrati.service';

@Component({
  selector: 'app-registrati',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
  <section class="listing-apply">
        <h2 class="section-heading">Registrati</h2>
        <form [formGroup]="applyForm" (submit)="submitApplication()">
        <label for="first-name">Username</label>
          <input id="first-name" type="text" formControlName="username">

          <label for="last-name">Età</label>
          <input id="last-name" type="text" formControlName="eta">

          <label for="first-name">Email</label>
          <input id="first-name" type="text" formControlName="email">

          <label for="last-name">Password</label>
          <input id="last-name" type="password" formControlName="password">

          <label for="last-name">Ripeti password</label>
          <input id="last-name" type="password" formControlName="ripetiPassword">

          <button type="submit" class="primary">Registrati</button>
        </form>
      </section>
  `,
  styleUrl: './registrati.component.css'
})
export class RegistratiComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  registratiService = inject(RegistratiService);

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

  submitApplication() {
    this.registratiService.submitApplication(
      this.applyForm.value.username ?? '',
      this.applyForm.value.eta ?? '',
      this.applyForm.value.email ?? '',
      this.applyForm.value.password ?? '',
      this.applyForm.value.ripetiPassword ?? '',
    );
  }
}
