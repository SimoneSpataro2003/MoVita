import { Component } from '@angular/core';
import { Evento } from '../../model/Evento';
import { CardUtenteComponent } from '../../shared/common/card-utente/card-utente.component';
import { CommonModule } from '@angular/common';
import { EventService } from '../../services/event/event.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CardUtenteComponent, CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {

  constructor(private eventService: EventService){}

  evento: Evento | null = null;


  showEventDetails(): void {
    const id = Number(1);
    if (id) {
      this.eventService.getEventById(id).subscribe({
        next: (data) => this.evento = data,
        error: (err) => console.error('Errore nel recupero dettagli evento')
      });      
    }   
  } 
}
