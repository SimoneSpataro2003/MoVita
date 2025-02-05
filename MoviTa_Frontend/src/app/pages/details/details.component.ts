import { Component, ViewChild } from '@angular/core';
import { Evento } from '../../model/Evento';
import { CommonModule } from '@angular/common';
import { EventService } from '../../services/event/event.service';
import { ActivatedRoute } from '@angular/router';
import { Partecipazione } from '../../model/Partecipazione';
import { CategoryService } from '../../services/category/category.service';
import { Categoria } from '../../model/Categoria';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../services/user/user.service';
import { CarouselEventImageComponent } from './carousel-event-image/carousel-event-image.component';
import { PartecipantiEventoComponent } from './partecipanti-evento/partecipanti-evento.component';
import { EventiSimiliComponent } from './eventi-simili/eventi-simili.component';
import { RecensioneComponent } from './recensione/recensione.component';
import { Utente } from '../../model/Utente';
import { PartecipazioneDTO } from '../../model/partecipazione-dto';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, RecensioneComponent ,EventiSimiliComponent, PartecipantiEventoComponent,CarouselEventImageComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {

  evento: Evento | null= null;
  partecipazioni: Partecipazione[] = [];
  eventiSimili : Evento[] = [];
  idEvento = 0;
  immaginiEvento: Blob[] = [];
  immagineVisibile: string ="";
  @ViewChild(CarouselEventImageComponent) carouselImage!: CarouselEventImageComponent;
  @ViewChild(EventiSimiliComponent) eventiSimiliComponent!: EventiSimiliComponent;
  @ViewChild(RecensioneComponent) recensioneComponent!: RecensioneComponent;
  prenotato = false;



  
  constructor(private route: ActivatedRoute, private eventService: EventService, private userService: UserService,  private categoryService: CategoryService, private cookieService: CookieService){ }

  ngOnInit(): void{
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
          this.recensioneComponent.ottieniRecensioni();
        },
        error: (err) => {
          console.error('Errore nel recupero dettagli evento', err);        
        }
      });      
    }  
  }

  sePrenotato():void{
    let eventiPrenotati: Partecipazione[] = [];
    let utenteId = JSON.parse(this.cookieService.get('utente')).id;
    this.eventService.getBookingById(utenteId).subscribe(
      {
        next: (data) =>{
          eventiPrenotati = data;
          for(let e of eventiPrenotati)
          {
            if(e.evento.id == this.idEvento)
              this.prenotato = true;
            console.log("PRENOTATOOOOO")
          }
         
        },
        error: (err) => {
          console.error('Errore nel recupero PARTECIPAZIONE evento', err);
        
        }
      }
    );
   
  }

  mostraDescrizioneEvento():void{
    if (this.evento!== null &&  this.evento!== undefined) {
      this.eventService.getEventDescription(this.idEvento).subscribe(
        {
          next: (data) =>{
            this.evento!.descrizione = data.descrizione;
          },
          error: (err) => {
            console.error('Errore nel recupero descrizione evento', err);
          
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
          console.error('Errore nel recupero partecipazioni evento', err);
        
        }
      });      
    }  
  }
  
  caricaImmagineCreatoreEvento():void{
    if(this.evento?.creatore !== undefined){
      this.userService.getImage(this.evento?.creatore?.id).subscribe(
        {
          next: (data) => {
            this.evento!.creatore.immagineProfilo = URL.createObjectURL(data); 
           
          },
          error: (err) => {
            console.error("Errore nel recupero dell'immagine del creatore dell'evento", err);
          
          }
        }
      );
    }
  }

  partecipa():void{   
    let utenteId = JSON.parse(this.cookieService.get('utente')).id;
    console.log("Utente LOGGATO")
    console.log(utenteId);	
    if(this.evento!== null){
      
      const dataOggi: string = new Date().toISOString().split('T')[0];
      
      let partecipazione: PartecipazioneDTO ={
        evento: this.evento.id,
        utente:utenteId,
        data:dataOggi,
        annullata:false
      }

      this.eventService.setEventBooking(partecipazione).subscribe(
        {
          next: (data) => {
            this.prenotato = true;
            console.log("Prenotazione effettuata con successo");
          },
          error: (err) => {
            console.log("Errore nell'effetuare prenotazione", err);
          }
        }
        
      );
    }  

    

  } 


}
