import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Evento} from '../../model/Evento';
import {HttpClient, HttpHandler} from '@angular/common/http';
import { EventCardComponent } from '../../shared/common/event-card/event-card.component';
import {MapComponent} from './map/map.component';
import {EventService} from '../../services/event/event.service';
import {Loadable} from '../../model/Loadable';
import {MapService} from '../../services/map/map.service';
import {NgbModal, NgbOffcanvas} from '@ng-bootstrap/ng-bootstrap';
import {ConsigliEventoComponent} from './consigli-evento/consigli-evento.component';
import {Categoria} from '../../model/Categoria';
import {CookieService} from 'ngx-cookie-service';
import {Utente} from '../../model/Utente';
import {EventFiltersComponent} from './event-filters/event-filters.component';
import {FormGroup} from '@angular/forms';
import {ToastService} from '../../services/toast/toast.service';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    EventCardComponent,
    MapComponent,
    EventFiltersComponent
  ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements AfterViewInit, Loadable{
  loaded: boolean = false;
  eventi: Evento[] = [];
  utente !: Utente;
  filterSummary : string = 'Nessun filtro selezionato';
  filterForm !: FormGroup;

  /*
  * eventService: chiamate API al backend
  * modalService: far comparire finestre modali via typescript.
  * */
  constructor(private eventService: EventService,
              private cookieService: CookieService,
              private modalService: NgbModal,
              private offcanvasService: NgbOffcanvas,
              private toastService: ToastService){}

  ngAfterViewInit() {
    this.showAllEvents();

    this.utente = JSON.parse(this.cookieService.get('utente'));
    this.showConsigliEvento();
  }

  showAllEvents(){
    this.eventService.getAllEvents().subscribe({
      next: (eventi: Evento[]) =>{
        this.eventi = eventi;
        this.loaded = true;
      },
      error:(err) =>{
        this.toastService.show('errorToast', 'Errore', 'Errore nel reperire le informazioni.\n Prova a ricaricaricare la pagina.');
      }
    })
  }

  showEvents($event: Evento[]){
    this.eventi = $event;
  }

  public showConsigliEvento(){
    //mostro i consigli solamente se il valore di mostraConsigliEventi è true!
    if (typeof window !== "undefined" && this.utente.mostraConsigliEventi) {
      const modalRef = this.modalService.open(ConsigliEventoComponent, {centered: true, scrollable:true});
      //passo al modale un riferimento a se stesso, così da potersi chiudere dall'interno.
      modalRef.componentInstance.thisModal = modalRef;
    }
  }

  public showFiltriEvento(){
    //mostro i consigli solamente se il valore di mostraConsigliEventi è true!
    if (typeof window !== "undefined") {
      const offCanvasRef = this.offcanvasService.open(EventFiltersComponent, {position:'top'});
      //passo al canvas un riferimento a se stesso, così da potersi chiudere dall'interno.
      offCanvasRef.componentInstance.thisOffcanvas = offCanvasRef;

      if(this.filterForm)
        offCanvasRef.componentInstance.filterForm = this.filterForm;

      offCanvasRef.componentInstance.filterSummary = this.filterSummary;

      offCanvasRef.componentInstance.ottieniEventi.subscribe((eventiFiltrati: Evento[]) => {
        this.showEvents(eventiFiltrati);
      });

      offCanvasRef.componentInstance.ottieniFilterSummary.subscribe((filterSummary: string) =>{
        this.filterSummary = filterSummary;
      });

      offCanvasRef.componentInstance.ottieniFormGroup.subscribe((filterForm: FormGroup) =>{
        this.filterForm = filterForm;
      });
    }
  }

  public isLoaded(): boolean {
    return this.loaded;
  }

}
