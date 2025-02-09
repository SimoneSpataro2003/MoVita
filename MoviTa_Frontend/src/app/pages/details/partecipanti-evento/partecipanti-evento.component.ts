import { Component, Input } from '@angular/core';
import { Utente } from '../../../model/Utente';
import { Partecipazione } from '../../../model/Partecipazione';
import { EventService } from '../../../services/event/event.service';
import { CardFriendComponent } from '../../../shared/common/card-friend/card-friend.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-partecipanti-evento',
  standalone: true,
  imports: [CardFriendComponent ],
  templateUrl: './partecipanti-evento.component.html',
  styleUrl: './partecipanti-evento.component.css'
})
export class PartecipantiEventoComponent {

  //amiciPartecipanti: Utente[] = [];
  altriUtenti: Partecipazione[] = [];
  @Input() idEvento !:number | null;

  constructor(private eventService:EventService,  private router: Router){}

  ngOnInit():void{
    this.ottieniPrenotazioni();
  }

  ottieniPrenotazioni():void{
    if(this.idEvento!== null){
      this.eventService.getBookingByEvent(this.idEvento).subscribe(
        {
          next: (data) => {
            this.altriUtenti = data;
            console.log("PARTECIPAZIONI APPOSTO")

          },
          error: (err) => {
            console.error('Errore nel recupero partecipanti evento', err);
            
          }
        }
      );


    }

  }

  navigaMostraTutti():void{
    this.router.navigate([`/event-booking/${this.idEvento}`]);
  }

}
