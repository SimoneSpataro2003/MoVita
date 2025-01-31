import { Component } from '@angular/core';
import { Evento } from '../../model/Evento';
import { CardUtenteComponent } from '../../shared/common/card-utente/card-utente.component';
import { CommonModule } from '@angular/common';
import { EventService } from '../../services/event/event.service';
import { ActivatedRoute } from '@angular/router';
import { Partecipazione } from '../../model/Partecipazione';
import { CategoryService } from '../../services/category/category.service';
import { Categoria } from '../../model/Categoria';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CardUtenteComponent, CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {

  evento: Evento | null= null;
  partecipazioni: Partecipazione[] = [];
  eventiSimili : Evento[] = [];
  idEvento = 0;
  
  constructor(route: ActivatedRoute, private eventService: EventService,  private categoryService: CategoryService){
    this.idEvento = Number(route.snapshot.paramMap.get('id'));
    this.mostraDettagliEvento();
    this.mostraPartecipazioniEvento();
    //this.mostraEventiSimili(this.evento?.categorie!);
  }

  mostraDettagliEvento(): void {    
    if (this.idEvento) {
      this.eventService.getEventById(this.idEvento).subscribe({
        next: (data) => {
          this.evento = data;
         
        },
        error: (err) => {
          console.error('Errore nel recupero dettagli evento', err);
        
        }
      });      
    }  
  }

  mostraPartecipazioniEvento(): void {    
    if (this.idEvento) {
      this.eventService.getPartecipazioniByEvent(this.idEvento).subscribe({
        next: (data) => {
          this.partecipazioni = data;
          console.log(data);
         
        },
        error: (err) => {
          console.error('Errore nel recupero dettagli evento', err);
        
        }
      });      
    }  
  }

  mostraEventiSimili(categoria: Categoria[]): void {   
    for(let i of categoria) 
    {
      if (this.idEvento) {
        this.categoryService.findEventsByCategory(String(i.id)).subscribe({
          next: (data) => {
            this.eventiSimili = data;
            console.log(data);
           
          },
          error: (err) => {
            console.error('Errore nel recupero dettagli evento', err);
          
          }
        });      
      }  
    }
    
  }


}
