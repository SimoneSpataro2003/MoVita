import { Recensioni } from "./Recensioni";

export interface Evento{
    nome:string;
    organizzatore:string;
    immagine:string[];
    indirizzo:string;
    capienzaMax:number;
    etaMinima: number;
    descrizione:string;
    prezzo:number;
    categoria:string;
    partecipanti:string[];
    recensioni:Recensioni[];
}