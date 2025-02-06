import { Injectable } from '@angular/core';
import {catchError, Observable} from 'rxjs';
import {Utente} from '../../model/Utente';
import {AuthHttpClientService} from '../auth-http/auth-http-client.service';
import {Pagamento} from '../../model/Pagamento';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://localhost:8080/api/payment';

  constructor(private authHttp: AuthHttpClientService) { }

  public getPayments(id: number | undefined): Observable<Pagamento[]> {
    return this.authHttp.get(`${this.apiUrl}/get-payments/${id}`);
  }

  createPayment(payment: Pagamento): Observable<Pagamento> {
    const body = { id: 0, titolo: payment.name, ammontare: payment.ammontare, date: payment.date, id_utente: payment.id_utente };

    return this.authHttp.post(`${this.apiUrl}/create-payment/${payment}`, body)
      .pipe(
        catchError((error) => {
          console.error('Payment creation failed', error);
          throw error;  // Or handle appropriately
        })
      );
  }

}
