import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { Utente } from '../../model/Utente';
import { CommonModule } from '@angular/common';
import {EventCardComponent} from '../events/event-card/event-card.component';
import {CardFriendComponent} from './card-friend/card-friend.component'; // Importa CommonModule

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  standalone: true,
  styleUrls: ['./profile.component.css'],
  imports: [CommonModule, EventCardComponent, CardFriendComponent, RouterLink] // Aggiungi CommonModule qui
})
export class ProfileComponent implements OnInit {
  userId!: number;
  user!: Utente;
  friendships: Utente[] = [];
  loaded: boolean = false;
  protected numberAmici: number = 0;
  protected loadedAmici: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = parseInt(params.get('id')!, 10);
      this.getFriends();
      this.getUser();
    });
  }

  getUser() {
    this.userService.getUserById(this.userId).subscribe({
      next: (user) => {
        console.log(user); // Verifica la struttura della risposta
        this.user = user; // Questo potrebbe dare errore se i tipi non sono compatibili
        this.loaded = true;
      },
      error:(error) => {
        console.log(error);
      }
    });
  }

  getFriends() {
    this.userService.getFriends(this.userId).subscribe({
      next: (friendship : Utente[]) => {
        this.friendships = friendship;
        console.log(friendship);
        this.loadedAmici = true;
        this.numberAmici = this.friendships.length;
      },
      error:(error) => {
        console.log(error);
      }
    })
  }
}
