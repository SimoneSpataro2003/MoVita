import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
  <section class="listing-apply">
        <h2 class="section-heading">Esegui il login</h2>
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="first-name">Email</label>
          <input id="first-name" type="text" formControlName="email">

          <label for="last-name">Password</label>
          <input id="last-name" type="password" formControlName="password">

          <button type="submit" class="primary">Login</button>
        </form>
      </section>
  `,
  styleUrl: './login.component.css'
})
export class LoginComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  loginService = inject(LoginService);

  applyForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor() {
    //costruttore
  }

  submitApplication() {
    this.loginService.submitApplication(
      this.applyForm.value.email ?? '',
      this.applyForm.value.password ?? '',
    );
  }
}
