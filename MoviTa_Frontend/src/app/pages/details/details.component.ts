import { Component, ViewChild } from '@angular/core';
import { Evento } from '../../model/Evento';
import { CommonModule } from '@angular/common';
import { EventService } from '../../services/event/event.service';
import { ActivatedRoute } from '@angular/router';
import { Partecipazione } from '../../model/Partecipazione';
import { CategoryService } from '../../services/category/category.service';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../services/user/user.service';
import { CarouselEventImageComponent } from './carousel-event-image/carousel-event-image.component';
import { PartecipantiEventoComponent } from './partecipanti-evento/partecipanti-evento.component';
import { EventiSimiliComponent } from './eventi-simili/eventi-simili.component';
import { RecensioneComponent } from './recensione/recensione.component';
import { PartecipazioneDTO } from '../../model/partecipazione-dto';
import { ToastService } from '../../services/toast/toast.service';
import { AggiungiRecensioneComponent } from './aggiungi-recensione/aggiungi-recensione.component';
import { Recensione } from '../../model/Recensione';
import { UserCardOrizzontaleComponent } from '../../shared/common/user-card-orizzontale/user-card-orizzontale.component';
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, UserCardOrizzontaleComponent, RecensioneComponent, EventiSimiliComponent, PartecipantiEventoComponent, CarouselEventImageComponent, AggiungiRecensioneComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {

  evento: Evento | null = null;
  partecipazioni: Partecipazione[] = [];
  eventiSimili: Evento[] = [];
  idEvento = 0;
  immaginiEvento: Blob[] = [];
  immagineVisibile: string = "";
  @ViewChild(CarouselEventImageComponent) carouselImage!: CarouselEventImageComponent;
  @ViewChild(EventiSimiliComponent) eventiSimiliComponent!: EventiSimiliComponent;
  @ViewChild(RecensioneComponent) recensioneComponent!: RecensioneComponent;
  prenotato = false;
  passato = false;
  creatoDaMe = false;
  capienzaRaggiunta = false;
  prenotatoPrima = false;
  azienda = false;


  constructor(private route: ActivatedRoute,
    private eventService: EventService,
    private userService: UserService,
    private categoryService: CategoryService,
    private cookieService: CookieService,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.idEvento = Number(this.route.snapshot.paramMap.get('id'));
    this.mostraDettagliEvento();
    this.mostraPartecipazioniEvento();
    this.sePrenotato();

  }


  mostraDettagliEvento(): void {
    if (this.idEvento) {
      this.eventService.getEventById(this.idEvento).subscribe({
        next: (data) => {
          this.evento = data;
          this.mostraDescrizioneEvento();
          this.caricaImmagineCreatoreEvento();
          this.carouselImage.caricaNomiImmaginiEvento(this.evento);
          this.eventiSimiliComponent.mostraEventiSimili(this.idEvento);
          const timestampEvento = new Date(this.evento.data).getTime();
          const timestampAttuale = Date.now();
          if (timestampEvento < timestampAttuale) {
            this.passato = true;
            this.recensioneComponent.ottieniRecensioni();
          }
          if (this.evento.creatore.id === JSON.parse(this.cookieService.get('utente')).id) {
            this.creatoDaMe = true;
          }
          if(this.evento.maxNumPartecipanti == this.evento.numPartecipanti){
            this.capienzaRaggiunta = true;
          }
          if(JSON.parse(this.cookieService.get('utente')).azienda)
          {
            this.azienda = true;
          }

        },
        error: (err) => {
          this.toastService.show('errorToast', 'Errore', "Errore nel reperire le informazioni dell'evento.\n Prova a ricaricaricare la pagina.");
        }
      });
    }
  }

  sePrenotato(): void {
    let eventiPrenotati: Partecipazione[] = [];
    let utenteId = JSON.parse(this.cookieService.get('utente')).id;
    this.eventService.getBookingById(utenteId).subscribe(
      {
        next: (data) => {
          eventiPrenotati = data;
          for (let e of eventiPrenotati) {
            if (e.evento.id == this.idEvento)
              if(!e.annullata)
              {
                this.prenotato = true;
              }
              else{
                this.prenotatoPrima = true;
              }
              
          }
        },
        error: (err) => {
          this.toastService.show('errorToast', 'Errore', "Errore nell'elaborazione della prenotazione.\n Prova a ricaricare la pagina.");
        }
      }
    );

  }

  mostraDescrizioneEvento(): void {
    if (this.evento !== null && this.evento !== undefined) {
      this.eventService.getEventDescription(this.idEvento).subscribe(
        {
          next: (data) => {
            this.evento!.descrizione = data.descrizione;
          },
          error: (err) => {
            this.toastService.show('errorToast', 'Errore', "Errore nel recupero della descrizione dell'evento.\n Prova a ricaricare la pagina.");

          }
        }
      );
    }
  }

  mostraPartecipazioniEvento(): void {
    if (this.idEvento) {
      this.eventService.getPartecipazioniByEvent(this.idEvento).subscribe({
        next: (data) => {
          this.partecipazioni = data;
          console.log(data);
        },
        error: (err) => {
          this.toastService.show('errorToast', 'Errore', "Non è stato possibile recuperare le partecipazioni dell'evento.");
        }
      });
    }
  }

  caricaImmagineCreatoreEvento(): void {
    if (this.evento?.creatore !== undefined) {
      this.userService.getImage(this.evento?.creatore?.id).subscribe(
        {
          next: (data) => {
            this.evento!.creatore.immagineProfilo = URL.createObjectURL(data);

          },
          error: (err) => {
            this.evento!.creatore.immagineProfilo = "/img/user_default.jpg";
          }
        }
      );
    }
  }

  partecipa(): void {
    let utenteId = JSON.parse(this.cookieService.get('utente')).id;


    if (this.evento !== null) {


      const dataOggi: string = new Date().toISOString().split('T')[0];

      let partecipazione: PartecipazioneDTO = {
        evento: this.evento.id,
        utente: utenteId,
        data: dataOggi,
        annullata: false
      }

      if(!this.prenotatoPrima){
        this.eventService.setEventBooking(partecipazione).subscribe(
          {
            next: (data) => {
              this.prenotato = true;
              this.toastService.show('successToast', 'Prenotazione effettuata', "Prenotazione all'evento effettuata!");
              window.location.reload();
              
            },
            error: (err) => {
              this.toastService.show('errorToast', 'Errore', "Errore durante la procedura di prenotazione.\n Prova a ricaricaricare la pagina.");
            }
          }
  
        );
      }
      else{
        this.eventService.updateBooking(partecipazione).subscribe(
          {
            next: (data) => {
              this.prenotato = true;              
              this.toastService.show('successToast', 'Annullamento della prenotazione effettuata', "Annullamento effettuato!");
              window.location.reload();
            },
            error: (err) => {
              this.toastService.show('errorToast', 'Errore', "Errore durante la procedura di annullamento della prenotazione.\n Prova a ricaricaricare la pagina.");
            }
          }
  
        );
      }
      
    }  



  }

  annullaPrenotazione(): void {

    let utenteId = JSON.parse(this.cookieService.get('utente')).id;
    console.log("Utente LOGGATO")
    console.log(utenteId);
    if (this.evento !== null) {

      const dataOggi: string = new Date().toISOString().split('T')[0];

      let partecipazione: PartecipazioneDTO = {
        evento: this.evento.id,
        utente: utenteId,
        data: dataOggi,
        annullata: true
      }

      this.eventService.updateBooking(partecipazione).subscribe(
        {
          next: (data) => {
            this.prenotato = false;
            this.prenotatoPrima = true;
            window.location.reload();
            this.toastService.show('successToast', 'Annullamento della prenotazione effettuata', "Annullamento effettuato!");
          },
          error: (err) => {
            this.toastService.show('errorToast', 'Errore', "Errore durante la procedura di annullamento della prenotazione.\n Prova a ricaricaricare la pagina.");
          }
        }

      );
    }


  }

  

}
