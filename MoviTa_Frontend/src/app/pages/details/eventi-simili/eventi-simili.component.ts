import { Component, Input } from '@angular/core';
import { Evento } from '../../../model/Evento';
import { EventCardComponent } from '../../../shared/common/event-card/event-card.component';
import { EventService } from '../../../services/event/event.service';
import { Categoria } from '../../../model/Categoria';
import { CategoryService } from '../../../services/category/category.service';

@Component({
  selector: 'app-eventi-simili',
  standalone: true,
  imports: [EventCardComponent],
  templateUrl: './eventi-simili.component.html',
  styleUrl: './eventi-simili.component.css'
})
export class EventiSimiliComponent {

  eventiSimili: Evento[] = [];
  constructor(private eventService: EventService, private categoryService: CategoryService) { }

  mostraEventiSimili(idEvento: number) {
    if (idEvento !== null) {      //ottieni categorie evento
      let categorie: Categoria[] = [];
      this.eventService.getCategories(idEvento).subscribe({
        next: (data) => {
          categorie = data;
          console.log(data);
          this.ottieniEventi(idEvento, categorie);
        },
        error: (err) => {
          console.error('Errore nel recupero CATEGORIE evento', err);
        }
      });

    }
  }

  ottieniEventi(idEvento: number, categorie: Categoria[]): void {
    let eventiS = new Set<number>(); // Set di ID per il controllo dei duplicati
   
    console.log("CATEGORIE ARRIVATE");

    for (let i of categorie) {
      if (idEvento) {
        this.categoryService.findEventsByCategory(String(i.id)).subscribe({
          next: (data) => {
            for (let d of data) {
              if (!eventiS.has(d.id)) {  // Controllo basato sull'id
                eventiS.add(d.id);
                this.eventiSimili.push(d);
              }
            }           
          },
          error: (err) => {
            console.error('Errore nel recupero eventi simili', err);
          }
        });
      }
    
    }



  }


}
