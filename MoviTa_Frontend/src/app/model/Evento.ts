import {Utente} from './Utente';
import {Categoria} from './Categoria';
import {Partecipazione} from './Partecipazione';
import {Recensione} from './Recensione';

export interface Evento{
  id: number,
  nome:string,
  data:string,
  prezzo:number,
  citta:string,
  indirizzo:string,
  numPartecipanti:number,
  maxNumPartecipanti:number,
  etaMinima: number,
  descrizione:string,
  valutazioneMedia:string,
  creatore: Utente,

  immagini: string[],
  categorie: Categoria[],
  prenotazioni: Partecipazione[],
  recensioni: Recensione[]
}
