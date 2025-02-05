import {Categoria} from './Categoria';

export class IconaCategoriaMapper{
  private static iconMap: Record<number, string> = {
    1: "bi-music-note-beamed", // Concerto
    2: "bi-music-player", // Festival musicale
    3: "bi-theater", // Teatro
    4: "bi-emoji-laughing", // Cabaret e stand-up comedy
    5: "bi-film", // Cinema
    6: "bi-book", // Evento letterario
    7: "bi-mic", // Conferenze e talk
    8: "bi-lightbulb", // Workshop e corsi formativi
    9: "bi-people", // Networking e business meetup
    10: "bi-shop", // Fiere ed esposizioni
    11: "bi-brush", // Mostra di arte
    12: "bi-camera", // Evento di fotografia
    13: "bi-person-arms-up", // Evento di moda e sfilate
    14: "bi-controller", // Competizione di eSports
    15: "bi-grid-3x3", // Torneo di scacchi
    16: "bi-suit-club", // Torneo di carte
    17: "bi-dice-5", // Evento di giochi da tavolo
    18: "bi-person-bounding-box", // Cosplay e fiera del fumetto
    19: "bi-people", // Raduno di fan
    20: "bi-hourglass", // Rievocazione storica
    21: "bi-joystick", // Evento di cultura pop e nerd
    22: "bi-moon-stars", // Evento di astronomia
    23: "bi-tree", // Trekking e escursioni
    24: "bi-lightning", // Sport estremo
    25: "bi-stopwatch", // Corsa e maratone
    26: "bi-bicycle", // Ciclismo e gare su due ruote
    27: "bi-heart-pulse", // Yoga e meditazione
    28: "bi-droplet", // Gara di nuoto
    29: "bi-dribbble", // Calcio
    30: "bi-dribbble", // Basket
    31: "bi-balloon", // Tennis e padel
    32: "bi-person-walking", // Arti marziali
    33: "bi-car-front", // Motori
    34: "bi-cup-straw", // Evento gastronomico o sagra
    35: "bi-egg-fried", // Corsi di cucina e showcooking
    36: "bi-vinyl", // Party e serate in discoteca
    37: "bi-mask", // Festa a tema
    38: "bi-chat-heart", // Speed dating e eventi per single
    39: "bi-globe", // Cultura etnica
    40: "bi-hand-thumbs-up", // Volontariato e beneficenza
    41: "bi-peace", // Incontri spirituali e religiosi
    42: "bi-award", // Crescita personale e coaching
    43: "bi-stars", // Magia e illusionismo
    44: "bi-cpu", // Realtà virtuale e tech innovation
    45: "bi-car-front", // Cinema drive-in
  };

  static getIcon(categoria: Categoria): string {
    return this.iconMap[categoria.id] || "bi-question-circle";
  }

  static getIconById(id: number): string {
    return this.iconMap[id] || "bi-question-circle";
  }
}
