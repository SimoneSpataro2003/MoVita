import {Utente} from './Utente';
import {Evento} from './Evento';

export interface Recensione{
  utente: Utente,
  evento: Evento,
  titolo: string,
  descrizione: string,
  valutazione: number,
  data: string
}
