import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MonoTypeOperatorFunction, Observable, OperatorFunction, TruthyTypesOf} from 'rxjs';
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

  public checkFriendship(id1: number, id2: number): Observable<any> {
    return this.authHttp.get(`${this.apiUrl}/check-friendship/${id1}/${id2}`);
  }

  public deleteFriendship(id1: number, id2: number): Observable<any> {
    const body = {id1: id1, id2: id2}
    return this.authHttp.post(`${this.apiUrl}/delete-friendship/${id1}/${id2}`, body);
  }

  public addFriendship(id1: number, id2: number): Observable<any> {
    const body = {id1: id1, id2: id2}
    return this.authHttp.post(`${this.apiUrl}/make-friendship/${id1}/${id2}`, body);
  }

  public findUsersWithFilter(filter: string): Observable<Utente[]> {
    return this.authHttp.get(`${this.apiUrl}/search-friends/${filter}`);
  }
}
