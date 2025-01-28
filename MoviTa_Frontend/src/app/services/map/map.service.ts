import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Evento} from '../../model/Evento';

@Injectable({
  providedIn: 'root'
})

//TODO: cambiare nome in LocationService o qualcosa di simile.
export class MapService {

  key: string;
  constructor(private http: HttpClient) {
    this.key = 'AIzaSyCrvavtLwbWlAXUIVMyUH0UBGyObwcD3NI';
  }

  getCoordinates(evento: Evento) {
    const { indirizzo, citta } = evento; // Presumo che Evento abbia proprietà 'via' e 'citta'.

    // Combina via e città in un singolo indirizzo
    const address = `${indirizzo}, ${citta}`.replace(/\s+/g, '+'); // Sostituisci gli spazi con '+'

    // Costruisci l'URL
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${this.key}`;

    // Effettua la richiesta HTTP
    return this.http.get(url);
  }
}
