import {Component, OnInit} from '@angular/core';
import {Loadable} from '../../model/Loadable';
import {Pagamento} from '../../model/Pagamento';
import {PaymentService} from '../../services/payment/payment.service';
import {CardPaymentComponent} from './card-payment/card-payment.component';
import {Utente} from '../../model/Utente';
import {CookieService} from 'ngx-cookie-service';
import {ToastService} from '../../services/toast/toast.service';

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
  private currentUserId: number | undefined;

  constructor(
    private paymentService: PaymentService,
    private cookieService: CookieService,
    private toastService: ToastService
  ) {
  }

  isLoaded(): boolean {
    return this.loaded;
  }

  ngOnInit(): void {
    let utente: Utente = JSON.parse(this.cookieService.get('utente'));
    this.currentUserId = utente.id;

    console.log(this.currentUserId);

    this.showAllPayments();
  }

  showAllPayments() {
    this.paymentService.getPayments(this.currentUserId).subscribe({
      next: (payment : Pagamento[]) => {
        this.payments = payment;
        console.log(payment);
        this.loaded = true;
      },
      error: (error) => {
        this.toastService.show('errorToast','Non riesco a visualizzare i pagamenti!', 'Impossibile visualizzare i pagamenti. \n riprova più tardi');
      }
    })
  }
}
