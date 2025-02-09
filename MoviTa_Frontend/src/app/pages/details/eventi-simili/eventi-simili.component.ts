import { Component, Input } from '@angular/core';
import { Evento } from '../../../model/Evento';
import { EventCardComponent } from '../../../shared/common/event-card/event-card.component';
import { EventService } from '../../../services/event/event.service';
import { Categoria } from '../../../model/Categoria';
import { CategoryService } from '../../../services/category/category.service';
import {ToastService} from '../../../services/toast/toast.service';

@Component({
  selector: 'app-eventi-simili',
  standalone: true,
  imports: [EventCardComponent],
  templateUrl: './eventi-simili.component.html',
  styleUrl: './eventi-simili.component.css'
})
export class EventiSimiliComponent {

  eventiSimili: Evento[] = [];
  @Input() idEvento !:number;
  constructor(private eventService: EventService,
              private categoryService: CategoryService,
              private toastService: ToastService) { }

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
          this.toastService.show('errorToast', 'Errore', 'Errore nel reperire le categorie di un evento.\n Prova a ricaricaricare la pagina.');
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
              if (!eventiS.has(d.id) && d.id !== this.idEvento) {  // Controllo basato sull'id
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
