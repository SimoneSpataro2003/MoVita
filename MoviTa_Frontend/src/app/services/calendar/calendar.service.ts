import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento } from '../../model/Evento';
import { Partecipazione } from '../../model/Partecipazione';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private apiUrl = 'https://api.yourcalendar.com/events';
  private apiKey = 'admin';

  constructor(private http: HttpClient) {}

  getEvents(userId: number): Observable<Evento[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    });

    return this.http.get<Evento[]>(`${this.apiUrl}?userId=${userId}`, { headers });
  }

  getParticipations(userId: number): Observable<Partecipazione[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer YOUR_AUTH_TOKEN` // Sostituisci con il token di autorizzazione
    });

    return this.http.get<Partecipazione[]>(`${this.apiUrl}/participations?userId=${userId}`, { headers });
  }
}
