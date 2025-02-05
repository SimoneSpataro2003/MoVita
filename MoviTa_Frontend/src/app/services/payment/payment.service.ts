import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
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
}
