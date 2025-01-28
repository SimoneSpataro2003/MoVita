import { Component } from '@angular/core';
import { Evento } from '../../model/Evento';
import { CardUtenteComponent } from '../../shared/common/card-utente/card-utente.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CardUtenteComponent, CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {

  //TODO: USARE SERVICE APPOSITO. (ho dovuto cancellare gli eventi placeholder in quanto
  // andavano in conflitto con la nuova struttura!)
  eventi: Evento[] = [];

}
