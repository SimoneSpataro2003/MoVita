import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

//FIXME:VA BENE?
export class AuthHttpClientService{

  /*NOTA: SE NON È MEMORIZZATO NESSUN COOKIE? L'auth guard ti riporta direttamente nella pagina di login!*/
  private token: string;
  private headers: HttpHeaders;
  constructor(private http: HttpClient, private cookieService: CookieService){
    //TODO: ottieni il cookie attraverso localStorage o ngx-cookie(da installare!)
    this.token = cookieService.get('token');
    this.headers = new HttpHeaders();

    //una volta ottenuto il cookie, costruisco il mio header.
    this.createHeaders();
  }

  private createHeaders(){
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
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
