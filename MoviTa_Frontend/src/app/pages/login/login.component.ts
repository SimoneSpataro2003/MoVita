import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  loginService = inject(LoginService);
  router = inject(Router);

  applyForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor() {}

  submitApplication() {
    this.loginService.submitApplication(
      this.applyForm.value.email ?? '',
      this.applyForm.value.password ?? '',
    );
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
