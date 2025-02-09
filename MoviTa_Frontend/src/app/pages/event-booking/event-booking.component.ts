import { Component, Input } from '@angular/core';
import { Partecipazione } from '../../model/Partecipazione';
import { UserCardOrizzontaleComponent } from '../../shared/common/user-card-orizzontale/user-card-orizzontale.component';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event/event.service';
import { UserService } from '../../services/user/user.service';
import { ToastComponent } from '../../toast/toast.component';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-event-booking',
  standalone: true,
  imports: [UserCardOrizzontaleComponent],
  templateUrl: './event-booking.component.html',
  styleUrl: './event-booking.component.css'
})
export class EventBookingComponent {

  idEvento = 0;
  partecipazioni : Partecipazione[] =[];
  
  constructor(private route: ActivatedRoute,  private eventService: EventService, private userService: UserService, private toastService: ToastService){}

  ngOnInit():void{
    this.idEvento = Number(this.route.snapshot.paramMap.get('id'));
    this.ottieniPrenotazioni();
    
  }

  ottieniPrenotazioni():void{
    if(this.idEvento!== null){
      this.eventService.getBookingByEvent(this.idEvento).subscribe(
        {
          next: (data) => {
            this.partecipazioni = data;            
            this.caricaImmaginiUser();
          },
          error: (err) => {
            this.toastService.show('errorToast', "Errore", "Errore nel recupero partecipanti evento. \n Prova a ricaricare la pagina.");            
          }
        }
      );


    }

  }

  caricaImmaginiUser():void{
    for(let i of this.partecipazioni){
      this.userService.getImage(i.utente.id).subscribe(
        {
          next: (data) => {
            i.utente.immagineProfilo = URL.createObjectURL(data);
           
          },
          error: (error) => {    
            i.utente.immagineProfilo = "/img/user_default.jpg" ;
          }
        }
      );
    }
  }
 

}
