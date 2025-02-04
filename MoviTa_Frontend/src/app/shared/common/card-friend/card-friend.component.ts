import {Component, Input, OnInit} from '@angular/core';
import {Loadable} from '../../../model/Loadable';
import {Utente} from '../../../model/Utente';
import {UserService} from '../../../services/user/user.service';
import {RouterLink} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

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


  constructor(private userService: UserService, private cookieService: CookieService) {
  }

  isLoaded(): boolean {
    return this.loaded;
  }

  ngOnInit(): void {
    this.showNumberFollowers();
    this.checkFriendship()
    this.caricaImmagineProfilo()

    let utente: Utente = JSON.parse(this.cookieService.get('utente'));
    this.currentUserId = utente.id;

    console.log("utente");
    console.log(utente)

    this.loaded = true;
  }

  showNumberFollowers(): void {
    this.userService.getNumberFollowers(this.utenteAmico.id).subscribe({
      next: result => {
        this.numeroFollowers = result; // Assume 'result' is the number of followers
      },
      error: () => {
        console.log("error show numberFollowers");
      }
    });
  }

  checkFriendship(): void {
    this.userService.checkFriendship(this.currentUserId, this.utenteAmico.id).subscribe({
      next: (result) => {
        this.alreadyFollow = result;
      },
      error: () => {
        console.error("Errore nel verificare l'amicizia");
      }
    });
  }

  deleteFriend(): void {
    this.userService.deleteFriendship(this.currentUserId, this.utenteAmico.id).subscribe({
      next: () => {
        this.alreadyFollow = false; // Aggiorna lo stato dopo la rimozione
      },
      error: () => {
        console.error("Errore per eliminare l'amicizia");
      }
    });
  }

  addFriend(): void {
    this.userService.addFriendship(this.currentUserId, this.utenteAmico.id).subscribe({
      next: (result) => {
        this.alreadyFollow = true;
      }
    })
  }

  caricaImmagineProfilo():void{
    this.userService.getImage(this.userId).subscribe(
      {
        next: (data) => {
          this.imagineProfile = URL.createObjectURL(data);

        },
        error: (err) => {
          console.error("Errore nel recupero dell'immagine del creatore dell'evento", err);

        }
      }
    );
  }
}
