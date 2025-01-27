import {Component, OnInit} from '@angular/core';
import {Evento} from '../../model/Evento';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {EventCardComponent} from './event-card/event-card.component';
import {MapComponent} from '../map/map.component';

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
export class EventsComponent implements OnInit{
  eventi: Evento[] = [];

  constructor(private http: HttpClient){

  }

  ngOnInit(): void {
    this.eventi = [
      {
        id: 1,
        nome: 'Concerto Rock',
        data: '2025-02-14',
        prezzo: 0,
        citta: 'Milano',
        indirizzo: 'Piazza Duomo',
        num_partecipanti: 120,
        max_num_partecipanti: 200,
        eta_minima: 18,
        descrizione: 'Un evento imperdibile per gli amanti del rock.',
        valutazione_media: '4.5',
        creatore: {
          id: 1,
          nome: 'Mario Rossi'},
      },
      {
        id: 2,
        nome: 'Fiera del Libro',
        data: '2025-03-10',
        prezzo: 10,
        citta: 'Roma',
        indirizzo: 'Via Nazionale',
        num_partecipanti: 300,
        max_num_partecipanti: 500,
        eta_minima: 0,
        descrizione: 'Libri per tutti i gusti.',
        valutazione_media: '4.8',
        creatore: { id: 2, nome: 'Luca Bianchi'},
      },
      {
        id: 1,
        nome: 'Concerto Rock',
        data: '2025-02-14',
        prezzo: 0,
        citta: 'Milano',
        indirizzo: 'Piazza Duomo',
        num_partecipanti: 120,
        max_num_partecipanti: 200,
        eta_minima: 18,
        descrizione: 'Un evento imperdibile per gli amanti del rock.',
        valutazione_media: '4.5',
        creatore: {
          id: 1,
          nome: 'Mario Rossi'},
      },
      {
        id: 1,
        nome: 'Concerto Rock',
        data: '2025-02-14',
        prezzo: 0,
        citta: 'Milano',
        indirizzo: 'Piazza Duomo',
        num_partecipanti: 120,
        max_num_partecipanti: 200,
        eta_minima: 18,
        descrizione: 'Un evento imperdibile per gli amanti del rock.',
        valutazione_media: '4.5',
        creatore: {
          id: 1,
          nome: 'Mario Rossi'},
      },
      {
        id: 1,
        nome: 'Concerto Rock',
        data: '2025-02-14',
        prezzo: 0,
        citta: 'Milano',
        indirizzo: 'Piazza Duomo',
        num_partecipanti: 120,
        max_num_partecipanti: 200,
        eta_minima: 18,
        descrizione: 'Un evento imperdibile per gli amanti del rock.',
        valutazione_media: '4.5',
        creatore: {
          id: 1,
          nome: 'Mario Rossi'},
      },
      {
        id: 1,
        nome: 'Concerto Rock',
        data: '2025-02-14',
        prezzo: 0,
        citta: 'Milano',
        indirizzo: 'Piazza Duomo',
        num_partecipanti: 120,
        max_num_partecipanti: 200,
        eta_minima: 18,
        descrizione: 'Un evento imperdibile per gli amanti del rock.',
        valutazione_media: '4.5',
        creatore: {
          id: 1,
          nome: 'Mario Rossi'},
      }]
  }

  showAllEvents(){

  }
}
