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
  num_partecipanti:number,
  max_num_partecipanti:number,
  eta_minima: number,
  descrizione:string,
  valutazione_media:string,
  id_creatore: number,

  categorie: Categoria[],
  partecipazioni: Partecipazione[],
  recensioni: Recensione[]
}
