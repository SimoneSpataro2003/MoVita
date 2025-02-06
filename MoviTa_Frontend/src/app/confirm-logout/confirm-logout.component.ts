import {Component, Input} from '@angular/core';
import {NgbActiveModal, NgbAlert, NgbAlertConfig, NgbAlertModule, NgbToast} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from '../services/auth/auth.service';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {ToastService} from '../services/toast/toast.service';

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
              private router: Router,
              private toastService: ToastService) {
  }

  logout(){
    this.authService.logout().subscribe({
      next: () =>{
        this.cookieService.delete('token');
        this.cookieService.delete('utente');
        this.thisModal.close();
        this.toastService.show('successToast',"Logout effettuato" ,"Logout effettuato con successo.");
        this.router.navigate(['/']);
      },
      error: (err:any) =>{
        this.toastService.show('errorToast',"Errore" ,"Impossibile effettuare il logout.");
      }
    })
  }

}
