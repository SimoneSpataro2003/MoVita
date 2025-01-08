import { Component } from '@angular/core';
import { Evento } from '../../model/Evento';
import { CardUtenteComponent } from '../../shared/common/card-utente/card-utente.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CardUtenteComponent, CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
 
  eventi: Evento[] = [
      {
        nome: "Festival Estivo",
        organizzatore: "SummerFest Organization",
        immagine: ["/assets/cinema.jpg", "/assets/eventi.jpg"],
        indirizzo: "Parco Nazionale, Via delle Stelle, 10",
        capienzaMax: 5000,
        etaMinima: 18,
        descrizione: "Un festival musicale estivo con concerti dal vivo di artisti internazionali e locali.",
        prezzo: 40.0,
        categoria: "Musica",
        partecipanti: ["Alice", "Bob", "Charlie", "David", "Eve"],
        recensioni: [
          { utente: "Alice", voto: 5, commento: "Esperienza incredibile! La musica dal vivo era fantastica." },
          { utente: "Bob", voto: 4, commento: "Ottima organizzazione, ma un po' di confusione agli ingressi." },
          { utente: "Charlie", voto: 5, commento: "Un'esperienza che rifarei subito!" }
        ]
      },
      {
        nome: "Conferenza sulla Tecnologia",
        organizzatore: "Tech World Conference",
        immagine: ["/assets/cinema.jpg", "/assets/eventi.jpg"],
        indirizzo: "Centro Congressi, Piazza della Innovazione, 45",
        capienzaMax: 800,
        etaMinima: 21,
        descrizione: "Una conferenza internazionale sui temi più innovativi della tecnologia, con esperti del settore.",
        prezzo: 150.0,
        categoria: "Tecnologia",
        partecipanti: ["Diana", "Ethan", "Gina"],
        recensioni: [
          { utente: "Diana", voto: 5, commento: "Le presentazioni erano molto interessanti e istruttive." },
          { utente: "Ethan", voto: 4, commento: "Un po' costoso, ma il contenuto valeva il prezzo." },
          { utente: "Gina", voto: 3, commento: "Alcuni argomenti erano troppo tecnici per me." }
        ]
      }
    ];
    
}
