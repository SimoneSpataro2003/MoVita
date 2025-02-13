import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Utente} from '../../model/Utente';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  URL: string = "http://localhost:8080/api/auth"
  constructor(private http: HttpClient){
  }

  login(body: any): Observable<any>{
    return this.http.post(this.URL + '/login', body);
  }

  registerUser(body: any): Observable<any>{
    return this.http.post(this.URL + '/register-person', body);
  }

  registerAgency(body: any): Observable<any>{
    return this.http.post(this.URL + '/register-agency', body);
  }

  logout(): Observable<any>{
    return this.http.get(this.URL +'/logout');
  }

  // Metodo per il login con Google, che invia il credential (token Google) al backend
  loginWithGoogle(credential: string): Observable<any> {
    return this.http.post('http://localhost:8080/api/auth/login-google', { credential: credential });
  }
}
