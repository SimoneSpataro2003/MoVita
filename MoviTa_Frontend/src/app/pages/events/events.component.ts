import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Evento} from '../../model/Evento';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {EventCardComponent} from './event-card/event-card.component';
import {MapComponent} from './map/map.component';
import {EventService} from '../../services/event/event.service';
import {Loadable} from '../../model/Loadable';
import {MapService} from '../../services/map/map.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ConsigliEventoComponent} from './consigli-evento/consigli-evento.component';
import {Categoria} from '../../model/Categoria';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    EventCardComponent,
    MapComponent
  ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit, Loadable{
  loaded: boolean = false;
  eventi: Evento[] = [];

  /*
  * eventService: chiamate API al backend
  * modalService: far comparire finestre modali via typescript.
  * */
  constructor(private eventService: EventService,
              private modalService: NgbModal){}

  ngOnInit(): void {
    this.showAllEvents();
    //TODO: if(utente.mostraConsigliEvento){ this.showConsigliEvento()}
    this.showConsigliEvento();
  }

  showAllEvents(){
    this.eventService.getAllEvents().subscribe({
      next: (eventi: Evento[]) =>{
        this.eventi = eventi;
        console.log(eventi);
        this.loaded = true;
      },
      error:(err) =>{
        //TODO: mostra errore con una finestra popup!
        console.log(err)
      }
    })
  }

  public showConsigliEvento(){
    if (typeof window !== "undefined") {
      const modalRef = this.modalService.open(ConsigliEventoComponent, {centered: true, scrollable:true});
      //passo al modale un riferimento a se stesso, così da potersi chiudere dall'interno.
      modalRef.componentInstance.thisModal = modalRef;
    }
  }

  public isLoaded(): boolean {
    return this.loaded;
  }

}
