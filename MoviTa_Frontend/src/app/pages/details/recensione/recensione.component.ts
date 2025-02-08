import { Component, Input } from '@angular/core';
import { Recensione } from '../../../model/Recensione';
import { EventService } from '../../../services/event/event.service';
import {ToastService} from '../../../services/toast/toast.service';
import { UserService } from '../../../services/user/user.service';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-recensione',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recensione.component.html',
  styleUrl: './recensione.component.css'
})
export class RecensioneComponent {

  recensioni: Recensione[] = [];  
  @Input() idEvento !:number | null;
  @Input() passato !:boolean | null;
  

  constructor(private eventService: EventService, private cookieService: CookieService, private userService: UserService,
              private toastService: ToastService){}

  ottieniRecensioni():void{
    if(this.idEvento!== null){
      this.eventService.getEventReview(this.idEvento).subscribe(
        {
          next: (data) => {
              this.recensioni = data;      
              this.caricaImmaginiAutori(); 
          },
          error: (err) => {
            this.toastService.show('errorToast', 'Errore', 'Errore nel recupero delle recensioni.\n Prova a ricaricaricare la pagina.');
          }
        }
      );
    }

  }

  caricaImmaginiAutori():void{
    for(let i of this.recensioni){
      this.userService.getImage(i.utente.id).subscribe(
        {
          next: (data) => {
            i.utente.immagineProfilo = URL.createObjectURL(data);
          },
          error: (error) => {
            this.toastService.show('errorToast', 'Errore', 'Errore nel immagini degli autori delle recensioni.\n Prova a ricaricaricare la pagina.');
          }
        }
      );
    }
  }

  get starsArray(): number[] {    
    return Array.from([0,1,2,3,4]); 
  }
  getStarClass(index: number, item: any): string {    
    const fullStars = Math.floor(item.valutazione); 
    const diff:number = item.valutazione - fullStars; 
    if (index < fullStars) {
      return 'bi bi-star-fill'; 
    } else if (index === fullStars && diff >= 0.5) {
      return 'bi bi-star-half'; 
    } else {
      return 'bi bi-star'; 
    }
  }
  
  


}
