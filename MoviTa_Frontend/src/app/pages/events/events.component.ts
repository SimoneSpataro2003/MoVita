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
        nome: "Concerto di Musica Classica",
        data: "2025-02-15T20:00:00",
        prezzo: 25,
        citta: "Roma",
        indirizzo: "Teatro dell'Opera, Piazza Beniamino Gigli",
        num_partecipanti: 2,
        max_num_partecipanti: 50,
        eta_minima: 18,
        descrizione: "Un concerto di musica classica con i migliori maestri d'orchestra.",
        valutazione_media: "4.5",
        id_creatore: 1,
        categorie: [
          { id: 1, nome: "Musica", descrizione: "Eventi musicali di ogni genere", utentiInteressati: [], eventi: [] },
          { id: 2, nome: "Cultura", descrizione: "Eventi culturali e artistici", utentiInteressati: [], eventi: [] }
        ],
        partecipazioni: [
          {
            id_evento: 1,
            id_utente: 1,
            data: "2025-02-15T20:00:00",
            annullata: false
          },
          {
            id_evento: 1,
            id_utente: 2,
            data: "2025-02-15T20:00:00",
            annullata: false
          }
        ],
        recensioni: [
          {
            id_utente: 1,
            id_evento: 1,
            titolo: "Stupendo!",
            descrizione: "Un'esperienza unica. Musica perfetta, atmosfera magica!",
            valutazione: 5,
            data: "2025-02-16T00:00:00"
          }
        ]
      },
      {
        id: 2,
        nome: "Maratona di Roma",
        data: "2025-03-10T08:00:00",
        prezzo: 50,
        citta: "Roma",
        indirizzo: "Piazza del Popolo",
        num_partecipanti: 5,
        max_num_partecipanti: 1000,
        eta_minima: 18,
        descrizione: "Una maratona internazionale, il cuore pulsante dello sport romano.",
        valutazione_media: "4.8",
        id_creatore: 2,
        categorie: [
          { id: 3, nome: "Sport", descrizione: "Eventi sportivi e competizioni", utentiInteressati: [], eventi: [] }
        ],
        partecipazioni: [
          {
            id_evento: 2,
            id_utente: 3,
            data: "2025-03-10T08:00:00",
            annullata: false
          },
          {
            id_evento: 2,
            id_utente: 4,
            data: "2025-03-10T08:00:00",
            annullata: false
          },
          {
            id_evento: 2,
            id_utente: 5,
            data: "2025-03-10T08:00:00",
            annullata: false
          }
        ],
        recensioni: [
          {
            id_utente: 3,
            id_evento: 2,
            titolo: "Una maratona indimenticabile!",
            descrizione: "Organizzazione impeccabile, ma è stata davvero una sfida!",
            valutazione: 4,
            data: "2025-03-11T00:00:00"
          }
        ]
      },
      {
        id: 3,
        nome: "Workshop di Fotografia",
        data: "2025-04-01T10:00:00",
        prezzo: 120,
        citta: "Milano",
        indirizzo: "Studio Fotografico Milano, Via Garibaldi 20",
        num_partecipanti: 3,
        max_num_partecipanti: 10,
        eta_minima: 16,
        descrizione: "Un workshop intensivo per migliorare la tua tecnica fotografica.",
        valutazione_media: "4.9",
        id_creatore: 3,
        categorie: [
          { id: 4, nome: "Formazione", descrizione: "Eventi didattici e workshop", utentiInteressati: [], eventi: [] }
        ],
        partecipazioni: [
          {
            id_evento: 3,
            id_utente: 6,
            data: "2025-04-01T10:00:00",
            annullata: false
          },
          {
            id_evento: 3,
            id_utente: 7,
            data: "2025-04-01T10:00:00",
            annullata: false
          },
          {
            id_evento: 3,
            id_utente: 8,
            data: "2025-04-01T10:00:00",
            annullata: false
          }
        ],
        recensioni: [
          {
            id_utente: 6,
            id_evento: 3,
            titolo: "Fantastico workshop!",
            descrizione: "Le tecniche insegnate sono state davvero utili e il fotografo molto preparato.",
            valutazione: 5,
            data: "2025-04-02T00:00:00"
          }
        ]
      },
      {
        id: 4,
        nome: "Corso di Yoga Avanzato",
        data: "2025-04-05T08:00:00",
        prezzo: 80,
        citta: "Napoli",
        indirizzo: "Centro Yoga, Via Roma 50",
        num_partecipanti: 4,
        max_num_partecipanti: 15,
        eta_minima: 18,
        descrizione: "Un corso intensivo di yoga per praticanti esperti.",
        valutazione_media: "4.7",
        id_creatore: 4,
        categorie: [
          { id: 5, nome: "Benessere", descrizione: "Eventi di salute e benessere", utentiInteressati: [], eventi: [] }
        ],
        partecipazioni: [
          {
            id_evento: 4,
            id_utente: 9,
            data: "2025-04-05T08:00:00",
            annullata: false
          },
          {
            id_evento: 4,
            id_utente: 10,
            data: "2025-04-05T08:00:00",
            annullata: false
          }
        ],
        recensioni: []
      },
      {
        id: 5,
        nome: "Fiera del Design",
        data: "2025-05-01T09:00:00",
        prezzo: 15,
        citta: "Milano",
        indirizzo: "Fiera Milano, Via Lario 100",
        num_partecipanti: 6,
        max_num_partecipanti: 200,
        eta_minima: 12,
        descrizione: "La più grande fiera del design in Italia, con espositori da tutto il mondo.",
        valutazione_media: "4.3",
        id_creatore: 5,
        categorie: [
          { id: 6, nome: "Design", descrizione: "Eventi legati al mondo del design e dell'innovazione", utentiInteressati: [], eventi: [] }
        ],
        partecipazioni: [
          {
            id_evento: 5,
            id_utente: 11,
            data: "2025-05-01T09:00:00",
            annullata: false
          },
          {
            id_evento: 5,
            id_utente: 12,
            data: "2025-05-01T09:00:00",
            annullata: false
          }
        ],
        recensioni: []
      },
      {
        id: 6,
        nome: "Corso di Cucina Vegetariana",
        data: "2025-06-10T11:00:00",
        prezzo: 45,
        citta: "Bologna",
        indirizzo: "Cucina Verde, Via Libertà 50",
        num_partecipanti: 3,
        max_num_partecipanti: 10,
        eta_minima: 16,
        descrizione: "Impara a preparare piatti vegetariani gustosi e salutari.",
        valutazione_media: "4.6",
        id_creatore: 6,
        categorie: [
          { id: 7, nome: "Cucina", descrizione: "Eventi culinari e gastronomici", utentiInteressati: [], eventi: [] }
        ],
        partecipazioni: [
          {
            id_evento: 6,
            id_utente: 13,
            data: "2025-06-10T11:00:00",
            annullata: false
          },
          {
            id_evento: 6,
            id_utente: 14,
            data: "2025-06-10T11:00:00",
            annullata: false
          }
        ],
        recensioni: []
      },
      {
        id: 7,
        nome: "Seminario di Marketing Digitale",
        data: "2025-07-15T09:00:00",
        prezzo: 150,
        citta: "Torino",
        indirizzo: "Centro Congressi, Via Torino 30",
        num_partecipanti: 7,
        max_num_partecipanti: 50,
        eta_minima: 18,
        descrizione: "Un seminario completo per imparare le tecniche di marketing digitale.",
        valutazione_media: "4.9",
        id_creatore: 7,
        categorie: [
          { id: 8, nome: "Marketing", descrizione: "Eventi di marketing e pubblicità", utentiInteressati: [], eventi: [] }
        ],
        partecipazioni: [
          {
            id_evento: 7,
            id_utente: 15,
            data: "2025-07-15T09:00:00",
            annullata: false
          },
          {
            id_evento: 7,
            id_utente: 16,
            data: "2025-07-15T09:00:00",
            annullata: false
          }
        ],
        recensioni: []
      },
      {
        id: 8,
        nome: "Festival della Cultura Contemporanea",
        data: "2025-08-01T14:00:00",
        prezzo: 10,
        citta: "Firenze",
        indirizzo: "Palazzo Vecchio",
        num_partecipanti: 8,
        max_num_partecipanti: 300,
        eta_minima: 18,
        descrizione: "Un festival che celebra la cultura contemporanea con artisti e performance da tutto il mondo.",
        valutazione_media: "4.7",
        id_creatore: 8,
        categorie: [
          { id: 2, nome: "Cultura", descrizione: "Eventi culturali e artistici", utentiInteressati: [], eventi: [] }
        ],
        partecipazioni: [
          {
            id_evento: 8,
            id_utente: 17,
            data: "2025-08-01T14:00:00",
            annullata: false
          }
        ],
        recensioni: []
      },
      {
        id: 9,
        nome: "Corsi di Lingua Spagnola",
        data: "2025-09-01T09:00:00",
        prezzo: 100,
        citta: "Palermo",
        indirizzo: "Scuola Linguistica, Via Indipendenza 50",
        num_partecipanti: 6,
        max_num_partecipanti: 20,
        eta_minima: 18,
        descrizione: "Un corso completo di lingua spagnola per tutti i livelli.",
        valutazione_media: "4.4",
        id_creatore: 9,
        categorie: [
          { id: 9, nome: "Formazione", descrizione: "Eventi di formazione e apprendimento", utentiInteressati: [], eventi: [] }
        ],
        partecipazioni: [
          {
            id_evento: 9,
            id_utente: 18,
            data: "2025-09-01T09:00:00",
            annullata: false
          },
          {
            id_evento: 9,
            id_utente: 19,
            data: "2025-09-01T09:00:00",
            annullata: false
          }
        ],
        recensioni: []
      },
      {
        id: 10,
        nome: "Festival della Pizza",
        data: "2025-10-10T18:00:00",
        prezzo: 20,
        citta: "Napoli",
        indirizzo: "Piazza del Plebiscito",
        num_partecipanti: 10,
        max_num_partecipanti: 500,
        eta_minima: 12,
        descrizione: "Un festival per celebrare la pizza in tutte le sue varianti, con chef da ogni parte d'Italia.",
        valutazione_media: "4.6",
        id_creatore: 10,
        categorie: [
          { id: 7, nome: "Cucina", descrizione: "Eventi culinari e gastronomici", utentiInteressati: [], eventi: [] }
        ],
        partecipazioni: [],
        recensioni: []
      }
    ];

  }

  showAllEvents(){

  }
}
