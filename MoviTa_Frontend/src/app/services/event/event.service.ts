import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Evento} from '../../model/Evento';
import {AuthHttpClientService} from '../auth-http/auth-http-client.service';
import { Partecipazione } from '../../model/Partecipazione';
import { Recensione } from '../../model/Recensione';
import { PartecipazioneDTO } from '../../model/partecipazione-dto';

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

  public getEventsByFilter(filter:any):Observable<Evento[]>{
    return this.authHttp.post(this.URL +`/get-events-by-filter`,filter);
  }

  public getPartecipazioniByEvent(id: number):Observable<Partecipazione[]>{
    return this.authHttp.get(this.URL +`/get-booking-by-event/${id}`);
  }

  public getCategories(evento_id:number){
    return this.authHttp.get(this.URL +`/get-categories/${evento_id}`);
  }
  public getImagesNames(id: number):Observable<string[]>{
    return this.authHttp.get(this.URL +`/get-image-names-event/${id}`);
  }

  public getImage(idEvento:number,nomeImmagine:string):Observable<Blob>{
    return this.authHttp.getBinaryContent(`${this.URL}/get-image-event/${idEvento}/${nomeImmagine}`);
  }
  public getEventDescription(idEvento:number){
    return this.authHttp.get(`${this.URL}/get-event-description/${idEvento}`);
  }

  public getBookingById(id:number): Observable<Partecipazione[]> {
    return this.authHttp.get(this.URL +`/get-booking-by-user/${id}`);
  }
  public getBookingByEvent(idEvento:number):Observable<Partecipazione[]>{
    return this.authHttp.get(this.URL +`/get-booking-by-event/${idEvento}`);
  }
  public getEventReview(idEvento:number):Observable<Recensione[]>{
    return this.authHttp.get(this.URL +`/get-event-review/${idEvento}`);
  }

  public setEventBooking(prenotazione:PartecipazioneDTO):Observable<Partecipazione>{
    return this.authHttp.post(this.URL +"/book-event",prenotazione);
  }

  public creaEvento( body : any) : Observable<any> {
    return this.authHttp.post(this.URL + "/create-event", body);
  }
}
