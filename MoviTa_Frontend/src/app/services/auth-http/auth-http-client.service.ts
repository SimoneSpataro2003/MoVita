import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

//FIXME:VA BENE?
export class AuthHttpClientService {

  /*NOTA: SE NON E' MEMORIZZATO NESSUN COOKIE? L'auth guard ti riporta direttamente nella pagina di login!*/
  private token: string;
  private headers: HttpHeaders;
  constructor(private http: HttpClient){
    //TODO: ottieni il cookie attraverso localStorage o ngx-cookie(da installare!)
    this.token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJnaWdnaSIsImlhdCI6MTczODI0NDc4MSwiZXhwIjoxNzM4ODQ5NTgxfQ.m7epOWfsyayNxYBcKBc2Q6NlF2J08LXOJvQgnNB6PqA';
    this.headers = new HttpHeaders();

    //una volta ottenuto il cookie, costruisco il mio header.
    this.createHeaders();
  }

  private createHeaders(){
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Accept': 'application/json'
    });
  }

  public get(url: string):Observable<any>{
    return this.http.get(url,{headers: this.headers});
  }

  public post(url: string, body:any):Observable<any>{
    return this.http.post(url,body,{headers: this.headers});
  }

  public put(url:string, body:any):Observable<any>{
    return this.http.put(url,body,{headers: this.headers});
  }

  public patch(url:string, body:any):Observable<any>{
    return this.http.patch(url,body,{headers: this.headers});
  }

  public delete(url:string):Observable<any>{
    return this.http.delete(url,{headers: this.headers});
  }
}
