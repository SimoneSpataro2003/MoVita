import { Component, Input, OnInit } from '@angular/core';
import { Loadable } from '../../../model/Loadable';
import { Utente } from '../../../model/Utente';
import { UserService } from '../../../services/user/user.service';
import { RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastService } from '../../../services/toast/toast.service';

@Component({
  selector: 'app-card-friend',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './card-friend.component.html',
  styleUrl: './card-friend.component.css'
})
export class CardFriendComponent implements OnInit, Loadable {
  @Input() utenteAmico!: Utente;
  @Input() userId!: number;
  numeroFollowers?: number;
  loaded: boolean = false;
  alreadyFollow = false;
  currentUserId!: number;
  protected imagineProfile: string | undefined;

  constructor(
    private userService: UserService,
    private cookieService: CookieService,
    private toastService: ToastService
  ) {}

  isLoaded(): boolean {
    return this.loaded;
  }

  ngOnInit(): void {
    let utente: Utente = JSON.parse(this.cookieService.get('utente'));
    this.currentUserId = utente.id;

    this.caricaImmagineProfilo();
    this.showNumberFollowers();
    this.checkFriendship();

    this.loaded = true;
  }

  showNumberFollowers(): void {
    this.userService.getNumberFollowers(this.utenteAmico.id).subscribe({
      next: (result) => {
        this.numeroFollowers = result;
      },
      error: () => {
        this.toastService.show('errorToast', "Errore", "Impossibile caricare il numero di followers. \n Prova a ricaricare la pagina.");
      }
    });
  }

  checkFriendship(): void {
    this.userService.checkFriendship(this.currentUserId, this.utenteAmico.id).subscribe({
      next: (result) => {
        this.alreadyFollow = result;
      },
      error: () => {
        this.toastService.show('errorToast', "Errore", "Impossibile leggere le amicizie dell'utente. \n Prova a ricaricare la pagina.");
      }
    });
  }

  deleteFriend(): void {
    this.userService.deleteFriendship(this.currentUserId, this.utenteAmico.id).subscribe({
      next: () => {
        this.alreadyFollow = false;
        if (this.numeroFollowers !== undefined) this.numeroFollowers--; // Aggiorna il numero followers
        this.toastService.show('successToast', "Amicizia rimossa", "Amicizia rimossa correttamente.");
      },
      error: () => {
        this.toastService.show('errorToast', "Errore", "Impossibile rimuovere l'amicizia. \n Prova a ricaricare la pagina.");
      }
    });
  }

  addFriend(): void {
    this.userService.addFriendship(this.currentUserId, this.utenteAmico.id).subscribe({
      next: () => {
        this.alreadyFollow = true;
        if (this.numeroFollowers !== undefined) this.numeroFollowers++; // Aggiorna il numero followers
        this.toastService.show('successToast', "Amicizia aggiunta", "Amicizia aggiunta correttamente.");
      },
      error: () => {
        this.toastService.show('errorToast', "Errore", "Impossibile aggiungere una nuova amicizia. Prova a ricaricare la pagina.");
      }
    });
  }

  caricaImmagineProfilo(): void {
    this.userService.getImage(this.utenteAmico.id).subscribe({
      next: (data) => {
        this.imagineProfile = URL.createObjectURL(data);
      },
      error: () => {
        this.imagineProfile = "/img/user_default.jpg";
      }
    });
  }
}
