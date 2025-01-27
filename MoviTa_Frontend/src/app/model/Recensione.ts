import {Utente} from './Utente';
import {Evento} from './Evento';

export interface Recensione{
  id_utente: number,
  id_evento: number,
  titolo: string,
  descrizione: string,
  valutazione: number,
  data: string
}
