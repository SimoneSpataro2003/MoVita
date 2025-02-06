import { Component, Input} from '@angular/core';
import { Evento } from '../../../model/Evento';
import { EventService } from '../../../services/event/event.service';
import {ToastService} from '../../../services/toast/toast.service';
@Component({
  selector: 'app-carousel-event-image',
  standalone: true,
  imports: [],
  templateUrl: './carousel-event-image.component.html',
  styleUrl: './carousel-event-image.component.css'
})
export class CarouselEventImageComponent {

  @Input() evento!:Evento | null;
  idEvento: number | null = null;
  immaginiEvento: string[] = [];    //immagini evento
  immagineVisibile = 0;   //quale i-esima immagine di immaginiEvento viene visualizza in primo piano nel carousel
  nomiImmaginiCaricate: string[]= [];

  constructor(private eventService: EventService,
              private toastService: ToastService){}

  ngOnInit():void{

  }

  caricaNomiImmaginiEvento(evento:Evento):void{
    this.evento = evento;

    if(this.evento !== undefined && this.evento !== null){
      this.eventService.getImagesNames(this.evento.id).subscribe(
        {
          next: (data) => {
            this.evento!.immagini = data;
            for(let i of this.evento?.immagini!)
            {
              this.caricaSingolaImmagineEvento(i);
            }
          },
          error: (err) => {
            this.toastService.show('errorToast', 'Errore', 'Errore nel reperire le informazioni richieste.\n Prova a ricaricaricare la pagina.');
          }
        }
      );
    }

  }

  caricaSingolaImmagineEvento(nomeImmagine:string):void{
    if(this.evento !== undefined && this.evento !== null && this.nomiImmaginiCaricate.indexOf(nomeImmagine)){
      this.eventService.getImage(this.evento.id, nomeImmagine).subscribe(
        {
          next: (data) => {
            this.immaginiEvento.push(URL.createObjectURL(data));
            this.nomiImmaginiCaricate.push(nomeImmagine);

          },
          error: (err) => {
            this.toastService.show('errorToast', 'Errore', "Errore nel recupero dell'immagine.\n Prova a ricaricaricare la pagina.");
          }
        }
      );


    }



  }



}
