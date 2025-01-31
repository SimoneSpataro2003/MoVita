import { Injectable } from '@angular/core';
import {AuthHttpClientService} from '../auth-http/auth-http-client.service';
import {Categoria} from '../../model/Categoria';
import {Observable} from 'rxjs';
import {Utente} from '../../model/Utente';
import {Evento} from '../../model/Evento';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private URL = 'http://localhost:8080/api/category'
  constructor(private authHttp: AuthHttpClientService) {
  }

  findAll():Observable<Categoria[]>{
    return this.authHttp.get(this.URL +'/find-all');
  }

  findById(categoryId:number):Observable<Categoria>{
    return this.authHttp.get(this.URL +`/find-by-id/${categoryId}`);
  }

  findByName(categoryName:string):Observable<Categoria[]>{
    return this.authHttp.get(this.URL +`/find-by-name/${categoryName}`);
  }

  findUsersByCategory(categoryId:string):Observable<Utente[]>{
    return this.authHttp.get(this.URL +`/find-users-by-category/${categoryId}`);
  }

  findEventsByCategory(categoryId:string):Observable<Evento[]>{
    return this.authHttp.get(this.URL +`/find-events-by-category/${categoryId}`);
  }



}
