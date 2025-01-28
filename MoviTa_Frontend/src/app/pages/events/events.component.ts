import {Component, OnInit} from '@angular/core';
import {Evento} from '../../model/Evento';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {EventCardComponent} from './event-card/event-card.component';
import {MapComponent} from './map/map.component';
import {EventService} from '../../services/event/event.service';
import {Loadable} from '../../model/Loadable';
import {MapService} from '../../services/map/map.service';

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

  constructor(private eventService: EventService){}

  ngOnInit(): void {
    this.showAllEvents();
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

  public isLoaded(): boolean {
    return this.loaded;
  }
}
