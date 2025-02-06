import { Component, Input } from '@angular/core';
import { Recensione } from '../../../model/Recensione';
import { EventService } from '../../../services/event/event.service';
import {ToastService} from '../../../services/toast/toast.service';

@Component({
  selector: 'app-recensione',
  standalone: true,
  imports: [],
  templateUrl: './recensione.component.html',
  styleUrl: './recensione.component.css'
})
export class RecensioneComponent {

  recensioni: Recensione[] = [];
  @Input() idEvento !:number | null;

  constructor(private eventService: EventService,
              private toastService: ToastService){}

  ottieniRecensioni():void{
    if(this.idEvento!== null){
      this.eventService.getEventReview(this.idEvento).subscribe(
        {
          next: (data) => {
              this.recensioni = data;
              console.log(this.recensioni);
          },
          error: (err) => {
            this.toastService.show('errorToast', 'Errore', 'Errore nel recupero delle recensioni.\n Prova a ricaricaricare la pagina.');
          }
        }
      );
    }

  }


}
