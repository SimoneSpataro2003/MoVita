import {Utente} from './Utente';
import {Evento} from './Evento';

export interface Categoria{
  id: number,
  nome: string,
  descrizione: string,

  utentiInteressati: Utente[],
  eventi: Evento[]
}
