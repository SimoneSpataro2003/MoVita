import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { Utente } from '../../model/Utente';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { CardFriendComponent } from '../../shared/common/card-friend/card-friend.component';
import {EventService} from '../../services/event/event.service';
import {Partecipazione} from '../../model/Partecipazione';
import {Evento} from '../../model/Evento';
import {CookieService} from 'ngx-cookie-service';
import {EventCardComponent} from '../../shared/common/event-card/event-card.component';
import {Loadable} from '../../model/Loadable';
import {PaymentService} from '../../services/payment/payment.service';
import {Pagamento} from '../../model/Pagamento';
import {ToastService} from '../../services/toast/toast.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  standalone: true,
  styleUrls: ['./profile.component.css'],
  imports: [CommonModule, CardFriendComponent, RouterLink, EventCardComponent] // Aggiungi CommonModule qui
})
export class ProfileComponent implements OnInit, Loadable {
  router = inject(Router);
  userId!: number;
  user!: Utente;
  currentUserId!: number;
  friendships: Utente[] = [];
  partecipations: Partecipazione[] = [];
  createdEvents: Evento[] = [];
  loaded: boolean = false;
  protected numberAmici: number = 0;
  private alreadyFollow: boolean = false;
  protected immagineProfilo!: string;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private eventService: EventService,
    private paymentService : PaymentService,
    private cookieService: CookieService,
    private toastService: ToastService
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = parseInt(params.get('id')!, 10);
      let utente: Utente = JSON.parse(this.cookieService.get('utente'));
      this.currentUserId = utente.id;
      this.getUser();
      this.getFriends();
      this.getPartecipations()
      this.getCreatedEvents()
      this.checkFriendship();
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
          this.immagineProfilo = "/img/user_default.jpg";
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
        this.loaded = true;
      },
      error:(error) => {
        this.toastService.show('errorToast',"Errore", "Impossibile Caricare l'utente. \n Prova a ricaricare la pagina.");
      }
    });
  }

  getFriends() {
    this.userService.getFriends(this.userId).subscribe({
      next: (friendship : Utente[]) => {
        this.friendships = friendship;
        console.log(friendship);
        this.numberAmici = this.friendships.length;
      },
      error:(error) => {
        this.toastService.show('errorToast',"Errore", "Impossibile Caricare gli amici. \n Prova a ricaricare la pagina.");
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
        this.toastService.show('errorToast',"Errore", "Impossibile caricare gli eventi. Prova a ricaricare la pagina.");
      }
    })
  }

  addFriend() {
    this.userService.addFriendship(this.currentUserId, this.userId).subscribe({
      next: (friendship : Utente) => {
        this.toastService.show('successToast',"Amicizia aggiunta", "Amicizia aggiunta correttamente.");
        this.alreadyFollow = true;
      },
      error:(err)=>{
        this.toastService.show('errorToast',"Errore", "Impossibile aggiungere una nuova amicizia. Prova a ricaricare la pagina.");
      }
    })
  }

  deleteFriend() {
    this.userService.deleteFriendship(this.currentUserId, this.userId).subscribe({
      next: (friendship : Utente) => {
        this.toastService.show('successToast',"Amicizia rimossa", "Amicizia rimossa correttamente.");
         this.alreadyFollow = false;
        },
      error:(err)=> {
        this.toastService.show('errorToast',"Errore", "Impossibile rimuovere l'amicizia. \n Prova a ricaricare la pagina.");
      }
    })
  }

  checkFriendship(): void {
    this.userService.checkFriendship(this.currentUserId, this.userId).subscribe({
      next: (result) => {
        this.alreadyFollow = result;
        console.log(this.userId + " : " + result)
      },
      error: () => {
        this.toastService.show('errorToast',"Errore", "Impossibile visualizzare l'amicizia. \n Prova a ricaricare la pagina.");
      }
    });
  }

  goPremium() {
    this.userService.goPremium(this.currentUserId).subscribe({
      next: (data) => {
        console.log(data);
        this.addPayment();
        this.user.premium = true;
        this.toastService.show('successToast',"Sei un membro premium!", "Benvenuto nel club! :)");
      },error:(err) => {
        this.toastService.show('errorToast',"Errore", "Non è stato possibile elaborare la richiesta. \n Prova a ricaricare la pagina.");
      }
    })
  }

  addPayment() {
    const nuovoPagamento: Pagamento = {
      "titolo": "Abbonamento mensile",
      "ammontare": 10,
      "data": new Date().toISOString().split('T')[0], // YYYY-MM-DD
      "id_utente": this.currentUserId
    };

    console.log(nuovoPagamento.data);

    this.paymentService.createPayment(nuovoPagamento).subscribe({
      next: (data) => {
        console.log(data);
        this.toastService.show('successToast', 'Pagamento effettuato', 'Il pagamento è stato completato con successo!');
      },
      error: (err) => {
        console.log(err);
        this.toastService.show('errorToast', 'Errore', 'Errore nell\'effettuare il pagamento. Prova a ricaricare la pagina.');
      }
    });
  }


  goToSettings() {
    this.router.navigate(['/profile/settings', this.currentUserId]);
  }

  isLoaded(): boolean {
    return this.loaded;
  }
}
