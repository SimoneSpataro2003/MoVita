import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class AuthHttpClientService{
  /*NOTA: SE NON È MEMORIZZATO NESSUN COOKIE? L'auth guard ti riporta direttamente nella pagina di login!*/
  private token: string;
  private headers: HttpHeaders = new HttpHeaders();
  constructor(private http: HttpClient, private cookieService: CookieService){
    if(cookieService.check('token')) {
      this.token = cookieService.get('token');
      this.createHeaders();
    }
    else
      this.token = '';

  }

  private createHeaders(){
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
  }

  public get(url: string):Observable<any>{
    this.checkToken();
    return this.http.get(url,{headers: this.headers});
  }

  public getBinaryContent(url: string):Observable<any>{
    this.checkToken();
    return this.http.get(url,{headers: this.headers, responseType: 'blob'});
  }

  public post(url: string, body:any):Observable<any>{
    this.checkToken();
    return this.http.post(url,body,{headers: this.headers});
  }

  public put(url:string, body:any):Observable<any>{
    this.checkToken();
    return this.http.put(url,body,{headers: this.headers});
  }

  public patch(url:string, body:any):Observable<any>{
    this.checkToken();
    return this.http.patch(url,body,{headers: this.headers});
  }

  public delete(url:string):Observable<any>{
    this.checkToken();
    return this.http.delete(url,{headers: this.headers});
  }

  checkToken(){
    if(this.token == ''){
      this.token = this.cookieService.get('token');
      this.createHeaders();
    }
  }
}
