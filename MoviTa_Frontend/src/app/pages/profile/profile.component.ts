import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { Utente } from '../../model/Utente';
import { CommonModule } from '@angular/common';
import { CardFriendComponent } from '../../shared/common/card-friend/card-friend.component';
import {EventService} from '../../services/event/event.service';
import {Partecipazione} from '../../model/Partecipazione';
import {Evento} from '../../model/Evento';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  standalone: true,
  styleUrls: ['./profile.component.css'],
  imports: [CommonModule, CardFriendComponent, RouterLink] // Aggiungi CommonModule qui
})
export class ProfileComponent implements OnInit {
  userId!: number;
  user!: Utente;
  friendships: Utente[] = [];
  partecipations: Partecipazione[] = [];
  createdEvents: Event[] = [];
  loaded: boolean = false;
  protected numberAmici: number = 0;
  protected loadedAmici: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private eventService: EventService,
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = parseInt(params.get('id')!, 10);
      this.getUser();
      this.getFriends();
      this.getPartecipations()
      this.getCreatedEvents()
      this.loaded = true;
    });
  }

  getUser() {
    this.userService.getUserById(this.userId).subscribe({
      next: (user) => {
        console.log(user); // Verifica la struttura della risposta
        this.user = user; // Questo potrebbe dare errore se i tipi non sono compatibili

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

  getPartecipations() {
    this.eventService.getBookingById(this.userId).subscribe({
      next: (partecipations: Partecipazione[]) => {
        console.log(partecipations); // Debug per verificare i dati ricevuti
        // Qui puoi assegnare i dati a una variabile, se necessario
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getCreatedEvents() {
    this.userService.getCreatedEventsById(this.userId).subscribe({
      next: (createdEvents : Evento[]) => {
        console.log(createdEvents);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
