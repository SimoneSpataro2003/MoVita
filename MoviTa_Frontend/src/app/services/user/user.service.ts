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

  public getFriends(id: number): Observable<Utente[]> {
    return this.authHttp.get(`${this.apiUrl}/find-friends/${id}`);
  }

  public getUserByUsername(username: string): Observable<Utente> {
    return this.authHttp.get(`${this.apiUrl}/get-user-by-username/${username}`);
  }

  public getNumberFollowers(id: number): Observable<any> {
    return this.authHttp.get(`${this.apiUrl}/count-friends/${id}`);
  }

  public getImage(id:number):Observable<Blob>{
    return this.authHttp.getBinaryContent(`${this.apiUrl}/get-image-user/${id}`);
  }

}
