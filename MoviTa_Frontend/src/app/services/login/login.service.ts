import { Injectable } from '@angular/core';
import { Utente } from '../../model/Utente';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url = 'http://localhost:3000/utenti';

  constructor() { }

  async getAllUsers() : Promise<Utente[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  async getUserById(id: Number) : Promise<Utente | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? {};
  }

  submitApplication(email: string, password: string) {
    console.log("Utente ", email, " loggato con successo!");
  }
}
