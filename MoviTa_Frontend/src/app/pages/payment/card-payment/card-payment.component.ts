import {Component, Input, OnInit} from '@angular/core';
import {Pagamento} from '../../../model/Pagamento';
import {CurrencyPipe, DatePipe} from '@angular/common';

@Component({
  selector: 'app-card-payment',
  standalone: true,
  imports: [
    DatePipe,
    CurrencyPipe
  ],
  templateUrl: './card-payment.component.html',
  styleUrl: './card-payment.component.css'
})
export class CardPaymentComponent implements OnInit {
  @Input() pagamento!: Pagamento;


  constructor() {
  }

  ngOnInit() {
    console.log("pagamento : " + this.pagamento.id);
  }
}
