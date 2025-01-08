import { Injectable } from '@angular/core';
import { Utente } from './utente';

@Injectable({
  providedIn: 'root'
})
export class RegistratiService {
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

  submitApplication(username: string, eta: number, email: string, password: string, ripetiPassword: string) {
    if (password == ripetiPassword) {
      if (eta >= 18) console.log("Utente ", email, "registrato con successo!");
      else console.log("Devi avere minimo 18 anni!")
    }
    else console.log("Le password non coincidono!");
  }
}
