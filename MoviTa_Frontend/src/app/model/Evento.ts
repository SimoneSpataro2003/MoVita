import { Recensioni } from "./Recensioni";
import {Utente} from './Utente';

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
    creatore: Utente,
}
