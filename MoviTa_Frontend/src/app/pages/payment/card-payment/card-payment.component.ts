import {Component, Input} from '@angular/core';
import {Pagamento} from '../../../model/Pagamento';

@Component({
  selector: 'app-card-payment',
  standalone: true,
  imports: [],
  templateUrl: './card-payment.component.html',
  styleUrl: './card-payment.component.css'
})
export class CardPaymentComponent {
  @Input() pagamento!: Pagamento;
  loaded: boolean = false;


  constructor() {
  }


}
