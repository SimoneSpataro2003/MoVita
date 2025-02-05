import {Component} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {Utente} from '../../model/Utente';
import {CookieService} from 'ngx-cookie-service';
import {NgbActiveModal, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmLogoutComponent} from '../../confirm-logout/confirm-logout.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  styleUrl: './header.component.css',
  templateUrl: './header.component.html'
})
export class HeaderComponent{
  currentUserId!: number;

  constructor(private router: Router,
              private cookieService: CookieService,
              private modalService: NgbModal) {}

  goToMyProfile() {
    let utente: Utente = JSON.parse(this.cookieService.get('utente'));
    this.currentUserId = utente.id;
    this.router.navigate(['/profile', this.currentUserId]);
  }

  get logged():boolean{
    return this.cookieService.check('token');
  }

  openLogoutModal() {
    let thisModal :NgbModalRef= this.modalService.open(ConfirmLogoutComponent, {centered: true});
    thisModal.componentInstance.thisModal = thisModal;
  }
}
