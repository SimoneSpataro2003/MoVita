import {Component, Input, OnInit} from '@angular/core';
import {Evento} from '../../../model/Evento';
import {Categoria} from '../../../model/Categoria';
import {NgbPopover} from '@ng-bootstrap/ng-bootstrap';
import {CategoryService} from '../../../services/category/category.service';
import {Observable} from 'rxjs';
import {EventService} from '../../../services/event/event.service';
import {Loadable} from '../../../model/Loadable';
import {Router, RouterModule} from '@angular/router';
import {IconaCategoriaMapper} from '../../../model/IconaCategoriaMapper';
import {NgOptimizedImage} from '@angular/common';
import {UserService} from '../../../services/user/user.service';
import {Utente} from '../../../model/Utente';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [
    NgbPopover,
    RouterModule,
    NgOptimizedImage
  ],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent implements OnInit, Loadable{
  @Input() evento!: Evento
  utente!: Utente;
  categorie :Categoria[] = [];
  loaded: boolean = false;
  readonly IconaCategoriaMapper = IconaCategoriaMapper;



  constructor(private categoryService: CategoryService,
              private eventService: EventService,
              private userService: UserService,
              private cookieService: CookieService,
              private router: Router) {
  }

  ngOnInit() {
    this.utente = JSON.parse(this.cookieService.get('utente')) ;
    this.showEventCategories();
  }

  showEventCategories(){
    this.eventService.getCategories(this.evento.id).subscribe({
      next: (categorie: Categoria[]) =>{
        this.categorie = categorie;
        this.getFriends();
      },
      error:(err) =>{
        //TODO: mostra errore con una finestra popup!
        console.log(err);
      }
    })
  }

  getFriends() {
    this.userService.getFriends(this.utente.id).subscribe({
      next: (friendship : Utente[]) => {
        this.utente.amici = friendship;
        this.cookieService.set('utente', JSON.stringify(this.utente));
        this.loaded = true;
      },
      error:(error) => {
        console.log(error);
      }
    })
  }

  checkFriendship(): boolean {
    this.userService.checkFriendship(this.utente.id, this.evento.creatore.id).subscribe({
      next: (result) => {
        return result;
      },
      error: () => {
        console.error("Errore nel verificare l'amicizia");
      }
    });
    return false;
  }

  isLoaded(): boolean {
    return this.loaded;
  }

  navigaDettagliEvento(idEvento:number){
    this.router.navigate([`/event-details/${idEvento}}`]);
  }
}
