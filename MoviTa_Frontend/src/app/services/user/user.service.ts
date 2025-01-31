import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Utente } from '../../model/Utente';
import {AuthHttpClientService} from '../auth-http/auth-http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/api/user';

  constructor(private authHttp: AuthHttpClientService) { }

  public getUserById(id: number): Observable<Utente> {
    return this.authHttp.get(`${this.apiUrl}/get-user/${id}`);
  }
}
