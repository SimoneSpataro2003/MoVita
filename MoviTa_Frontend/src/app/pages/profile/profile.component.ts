import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { Utente } from '../../model/Utente';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { CardFriendComponent } from '../../shared/common/card-friend/card-friend.component';
import {EventService} from '../../services/event/event.service';
import {Partecipazione} from '../../model/Partecipazione';
import {Evento} from '../../model/Evento';
import {CookieService} from 'ngx-cookie-service';
import {EventCardComponent} from '../../shared/common/event-card/event-card.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  standalone: true,
  styleUrls: ['./profile.component.css'],
  imports: [CommonModule, CardFriendComponent, RouterLink, EventCardComponent] // Aggiungi CommonModule qui
})
export class ProfileComponent implements OnInit {
  userId!: number;
  user!: Utente;
  currentUserId!: number;
  friendships: Utente[] = [];
  partecipations: Partecipazione[] = [];
  createdEvents: Evento[] = [];
  loaded: boolean = false;
  protected numberAmici: number = 0;
  protected loadedAmici: boolean = false;
  private alreadyFollow: boolean = false;
  protected immagineProfilo!: string;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private eventService: EventService,
    private cookieService: CookieService,
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = parseInt(params.get('id')!, 10);
      this.getUser();
      this.getFriends();
      this.getPartecipations()
      this.getCreatedEvents()
      this.checkFriendship();

      let utente: Utente = JSON.parse(this.cookieService.get('utente'));
      this.currentUserId = utente.id;

      this.loaded = true;
    });
  }

  isMyProfile() : boolean
  {
    return this.currentUserId == this.userId;
  }

  isAlreadyFriends() : boolean
  {
    return this.alreadyFollow;
  }

  caricaImmagineProfilo():void{
    this.userService.getImage(this.userId).subscribe(
      {
        next: (data) => {
          this.immagineProfilo = URL.createObjectURL(data);

        },
        error: (err) => {
          console.error("Errore nel recupero dell'immagine del creatore dell'evento", err);

        }
      }
    );
  }

  getUser() {
    this.userService.getUserById(this.userId).subscribe({
      next: (user) => {
        console.log(user); // Verifica la struttura della risposta
        this.user = user; // Questo potrebbe dare errore se i tipi non sono compatibili
        this.caricaImmagineProfilo();
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
        this.partecipations = partecipations;
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
        this.createdEvents = createdEvents;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  addFriend() {
    this.userService.addFriendship(this.currentUserId, this.userId).subscribe({
      next: (friendship : Utente) => {
        console.log(friendship);
      }
    })
  }

  deleteFriend() {
    this.userService.deleteFriendship(this.currentUserId, this.userId).subscribe({
      next: (friendship : Utente) => {
        console.log(friendship);
      }
    })
  }

  checkFriendship(): void {
    this.userService.checkFriendship(this.currentUserId, this.userId).subscribe({
      next: (result) => {
        this.alreadyFollow = result;
      },
      error: () => {
        console.error("Errore nel verificare l'amicizia");
      }
    });
  }


}
