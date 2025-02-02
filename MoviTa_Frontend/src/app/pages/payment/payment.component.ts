import {Component, OnInit} from '@angular/core';
import {Loadable} from '../../model/Loadable';
import {Pagamento} from '../../model/Pagamento';
import {ActivatedRoute} from '@angular/router';
import {PaymentService} from '../../services/payment/payment.service';
import {CardPaymentComponent} from './card-payment/card-payment.component';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    CardPaymentComponent

  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit , Loadable{
  loaded: boolean = false;
  payments: Pagamento[] = [];
  userId: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private paymentService: PaymentService
  ) {
  }

  isLoaded(): boolean {
    return this.loaded;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = parseInt(params.get('id')!, 10);
      this.showAllPayments();
    });
  }

  showAllPayments() {
    this.paymentService.getPayments(this.userId).subscribe({
      next: (payment : Pagamento[]) => {
        this.payments = payment;
        console.log(payment);
        this.loaded = true;
      },
      error: (error) => {
        console.log(error);
    }
    })
  }
}
