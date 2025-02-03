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
          this.ottieniEventi(idEvento,categorie);
        },
        error: (err) => {
          console.error('Errore nel recupero CATEGORIE evento', err);
        }
      });

    }
  }

  ottieniEventi(idEvento:number,categorie: Categoria[]): void {

    console.log("CATEGORIE ARRIVATE");
    for (let i of categorie) {
      if (idEvento) {
        this.categoryService.findEventsByCategory(String(i.id)).subscribe({
          next: (data) => {
            const isUnique = (data: Evento[]) => {
              for (let dataItem of data) {
                for (let eventItem of this.eventiSimili) {
                  console.log(`${eventItem.id} ${dataItem.id}`)
                  if (eventItem.id == dataItem.id)
                    return false;
                }
              }
              return true;
            };

            if (isUnique(data)) {
              this.eventiSimili = this.eventiSimili.concat(data);
              console.log("Eventi simili")
              console.log(this.eventiSimili);
              console.log("Eventi simili")


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
