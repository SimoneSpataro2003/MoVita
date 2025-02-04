import {Categoria} from './Categoria';
import {Partecipazione} from './Partecipazione';
import {Recensione} from './Recensione';
import {Evento} from './Evento';
import {Pagamento} from './Pagamento';

export interface Utente {
  id: number,
  username: string,
  email: string,
  password: string,
  nome: string,
  immagineProfilo: string,
  citta: string,
  azienda: boolean,
  personaCognome: string,
  aziendaPartitaIva: string,
  aziendaIndirizzo: string,
  aziendaRecapito: string,
  premium: boolean,
  premiumDataInizio: string,
  premiumDataFine: string,
  admin: boolean,
  dataCreazione: string,
  dataUltimaModifica: string,
  mostraConsigliEventi: boolean,

  amici: Utente[],
  categorieInteressate: Categoria[],
  eventiPartecipati: Partecipazione[],
  eventiRecensiti: Recensione[]
  eventiCreati: Evento[];
  utentiCercati: Utente[];
  pagamenti: Pagamento[];
  /*
  eventiCercati: ???,
  utentiCercati: ???,
  pagamenti: ???
  */
}
