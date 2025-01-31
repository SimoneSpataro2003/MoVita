import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Evento} from '../../model/Evento';
import {AuthHttpClientService} from '../auth-http/auth-http-client.service';
import { Partecipazione } from '../../model/Partecipazione';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private URL: string = 'http://localhost:8080/api/event';
  constructor(private authHttp: AuthHttpClientService) {
  }

  public getAllEvents():Observable<Evento[]>{
    return this.authHttp.get(this.URL +'/get-all-events');
  }

  public getEventById(id: number):Observable<Evento>{
    return this.authHttp.get(this.URL +`/get-event-by-id/${id}`);
  }

  public getPartecipazioniByEvent(id: number):Observable<Partecipazione[]>{
    return this.authHttp.get(this.URL +`/get-booking-by-event/${id}`);
  }

 
}
