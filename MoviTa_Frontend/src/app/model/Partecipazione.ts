import {Evento} from "./Evento";
import {Utente} from "./Utente";

export interface Partecipazione{
    id_evento: number,
    id_utente: number,
    data: string,
    annullata: boolean
}
