import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from '../services/auth/auth.service';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-confirm-logout',
  standalone: true,
  imports: [],
  templateUrl: './confirm-logout.component.html',
  styleUrl: './confirm-logout.component.css'
})
export class ConfirmLogoutComponent {
  @Input() thisModal!: NgbActiveModal;

  constructor(private authService: AuthService,
              private cookieService: CookieService,
              private router: Router) {
  }

  logout(){
    this.authService.logout().subscribe({
      next: () =>{
        this.cookieService.delete('token');
        this.cookieService.delete('utente');
        this.thisModal.close();
        this.router.navigate(['/']);
      }
    })
  }

}
