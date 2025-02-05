import { Component, Input } from '@angular/core';
import { Recensione } from '../../../model/Recensione';
import { EventService } from '../../../services/event/event.service';

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

  constructor(private eventService: EventService){}

  ottieniRecensioni():void{
    if(this.idEvento!== null){
      this.eventService.getEventReview(this.idEvento).subscribe(
        {
          next: (data) => {
              this.recensioni = data;
              console.log("Recensioni ARRIVATE");
              console.log(this.recensioni);
          },
          error: (err) => {
            console.log("Errore recupero RECENSIONI");
          }
        }
      );
    }

  }


}
