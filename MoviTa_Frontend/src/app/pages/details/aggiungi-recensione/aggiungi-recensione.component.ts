import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recensione } from '../../../model/Recensione';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { EventService } from '../../../services/event/event.service';
import { ToastService } from '../../../services/toast/toast.service';

@Component({
  selector: 'app-aggiungi-recensione',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './aggiungi-recensione.component.html',
  styleUrl: './aggiungi-recensione.component.css'
})
export class AggiungiRecensioneComponent {

  @Output() metodoAggiornaParent = new EventEmitter<void>();  
  @Input() idEvento !: number;
  recensito = false;

  idUtente: number | null = null;

  nuovaRecensione: any = {   
    titolo: '',
    descrizione: '',
    valutazione: 0,
  }

  constructor(private cookieService: CookieService,  private eventService: EventService, private toastService: ToastService) {
    this.idUtente = JSON.parse(this.cookieService.get('utente')).id;
  }

  ngOnInit(): void{
    this.eventService.getEventReview(this.idEvento).subscribe(
      {
        next: (data) => {
           for(let i of data)
           {
            if(i.utente.id === this.idUtente)
            {
              this.recensito = true;
            }
           }
        },
        error: (err) => {
          this.toastService.show('errorToast', 'Errore', 'Errore nel recupero delle recensioni.\n Prova a ricaricaricare la pagina.');
        }
      }
    );

  } 

  aggiungiRecensione(): void {
    this.nuovaRecensione.utente = this.idUtente;
    this.nuovaRecensione.evento = this.idEvento;
    this.eventService.setEventReview(this.nuovaRecensione).subscribe(
    {
      next: (data) => {
        console.log(data);
        this.metodoAggiornaParent.emit();
        this.recensito = true;
        
      },
      error: (error) => {
        this.toastService.show('errorToast', 'Errore', 'Errore nella pubblicazione della recensione.\n Prova a ricaricaricare la pagina.');
      }
    }
    );
  }



}
