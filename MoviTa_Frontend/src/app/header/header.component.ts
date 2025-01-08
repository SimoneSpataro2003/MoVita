import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  template: `
  <header>
    <nav class="navbar navbar-light bg-transparent">
      <div class="container">
        <div class="row align-items-center w-100">
          <!-- Logo -->
          <div class="col-3 text-start">
            <a class="navbar-brand text-white">MoVita</a>
          </div>

          <!-- Search Bar -->
          <div class="col-6">
            <div class="input-group">
              <input class="form-control text-center pl-3 h-input" type="search" placeholder="Search" aria-label="Search">
              <button class="btn btn-outline-success h-buttonoutline underlined" type="submit"><i class="bi bi-search"></i></button>
            </div>
          </div>

          <!-- Login and Register Buttons -->
          <div class="col-3 text-end">
            <button class="btn btn-outline-success h-button" type="submit" routerLink="login">Login</button>
            <button class="btn btn-primary h-buttonoutline" type="submit" routerLink="registrati">Registrati</button>
          </div>
        </div>
      </div>
    </nav>
  </header>
  `,
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
