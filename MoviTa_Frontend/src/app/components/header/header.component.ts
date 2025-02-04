import { Component } from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {Utente} from '../../model/Utente';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  styleUrl: './header.component.css',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  protected currentUserId!: number;
  constructor(private router: Router,
              private cookieService: CookieService) {}

    goToMyProfile() {
      let utente: Utente = JSON.parse(this.cookieService.get('utente'));
      this.currentUserId = utente.id;
      this.router.navigate(['/profile', this.currentUserId]);
  }
}
