import {Component, Input, OnInit} from '@angular/core';
import {Loadable} from '../../../model/Loadable';
import {Utente} from '../../../model/Utente';
import {UserService} from '../../../services/user/user.service';
import { ProfileComponent } from '../../../pages/profile/profile.component';
import {RouterLink} from '@angular/router';

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

  constructor(private userService: UserService) {
  }

  isLoaded(): boolean {
    return this.loaded;
  }

  ngOnInit(): void {
    this.showNumberFollowers();
    this.checkFriendship()
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
    this.userService.checkFriendship(this.userId, this.utenteAmico.id).subscribe({
      next: (result) => {
        this.alreadyFollow = result;
      },
      error: () => {
        console.error("Errore nel verificare l'amicizia");
      }
    });
  }

  deleteFriend(): void {
    this.userService.deleteFriendship(this.userId, this.utenteAmico.id).subscribe({
      next: () => {
        this.alreadyFollow = false; // Aggiorna lo stato dopo la rimozione
      },
      error: () => {
        console.error("Errore per eliminare l'amicizia");
      }
    });
  }

  addFriend(): void {
    this.userService.addFriendship(this.userId, this.utenteAmico.id).subscribe({
      next: (result) => {
        this.alreadyFollow = true;
      }
    })
  }
}
