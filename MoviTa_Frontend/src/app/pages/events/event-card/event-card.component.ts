import {Component, Input, OnInit} from '@angular/core';
import {Evento} from '../../../model/Evento';
import {Categoria} from '../../../model/Categoria';
import {NgbPopover} from '@ng-bootstrap/ng-bootstrap';
import {CategoryService} from '../../../services/category/category.service';
import {Observable} from 'rxjs';
import {EventService} from '../../../services/event/event.service';
import {Loadable} from '../../../model/Loadable';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [
    NgbPopover
  ],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent implements OnInit, Loadable{
  @Input() evento!: Evento
  categorie :Categoria[] = [];
  loaded: boolean = false;

  constructor(private categoryService: CategoryService,
              private eventService: EventService) {
  }

  ngOnInit() {
    this.showEventCategories();
  }

  showEventCategories(){
    this.eventService.getCategories(this.evento.id).subscribe({
      next: (categorie: Categoria[]) =>{
        this.categorie = categorie;
        this.loaded = true;
      },
      error:(err) =>{
        //TODO: mostra errore con una finestra popup!
        console.log(err);
      }
    })
  }

  isLoaded(): boolean {
    return this.loaded;
  }
}
