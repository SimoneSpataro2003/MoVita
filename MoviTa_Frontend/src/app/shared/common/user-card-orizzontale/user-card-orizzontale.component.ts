import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-card-orizzontale',
  standalone: true,
  imports: [],
  templateUrl: './user-card-orizzontale.component.html',
  styleUrl: './user-card-orizzontale.component.css'
})
export class UserCardOrizzontaleComponent {

  @Input() immagineUser!:string;
  @Input() username!:string;

}
