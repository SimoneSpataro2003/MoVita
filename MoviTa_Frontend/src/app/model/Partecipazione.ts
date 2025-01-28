import {Evento} from "./Evento";
import {Utente} from "./Utente";

export interface Partecipazione{
    evento: Evento,
    utente: Utente,
    data: string,
    annullata: boolean
}
