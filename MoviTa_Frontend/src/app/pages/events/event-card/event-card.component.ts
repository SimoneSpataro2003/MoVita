import {Component, Input} from '@angular/core';
import {Evento} from '../../../model/Evento';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent {
  @Input() evento!: Evento

}
