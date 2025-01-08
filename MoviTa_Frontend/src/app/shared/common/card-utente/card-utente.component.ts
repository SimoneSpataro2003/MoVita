import { Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-utente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-utente.component.html',
  styleUrl: './card-utente.component.css'
})
export class CardUtenteComponent {
  @Input() image!:string;
  @Input() username!:string;
}
