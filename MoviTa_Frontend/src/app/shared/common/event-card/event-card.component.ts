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
import {ToastService} from '../../../services/toast/toast.service';

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
  immagineEvento : string = "";
  immagineCreatore: string ="";
  readonly IconaCategoriaMapper = IconaCategoriaMapper;



  constructor(private categoryService: CategoryService,
              private eventService: EventService,
              private userService: UserService,
              private cookieService: CookieService,
              private toastService: ToastService,
              private router: Router) {
  }

  ngOnInit() {
    this.utente = JSON.parse(this.cookieService.get('utente')) ;
    this.showImageEvent();
    this.showImageCreator();
    this.showEventCategories();
  }


  showImageCreator():void{
    if(this.evento!==null && this.evento!==undefined)
    {
      this.userService.getImage(this.evento.creatore.id).subscribe(
        {
          next: (data) => {
            this.immagineCreatore = URL.createObjectURL(data);

          },
          error: (error) =>{
            this.toastService.show('errorToast',"Errore", "Impossibile recuperare l'immagine del creatore dell'evento. \n Prova a ricaricare la pagina.");
          }

        }
      );
    }
  }

  showImageEvent():void{
    if(this.evento!==null && this.evento!==undefined)
    {
      this.eventService.getImage(this.evento.id,"1.jpg").subscribe(
        {
          next: (data) => {
            this.immagineEvento = URL.createObjectURL(data);
          },
          error: (error) =>{
            console.log("Errore nel recupero immagine evento card",error);

          }

        }
      );
    }
  }

  showEventCategories(){
    this.eventService.getCategories(this.evento.id).subscribe({
      next: (categorie: Categoria[]) =>{
        this.categorie = categorie;
        this.loaded = true;
      },
      error:(err) =>{
        this.toastService.show('errorToast', 'Errore', 'Errore nel reperire le categorie di un evento.\n Prova a ricaricaricare la pagina.');
      }
    })
  }

  isLoaded(): boolean {
    return this.loaded;
  }

  navigaDettagliEvento(idEvento:number){
    this.router.navigate([`/event-details/${idEvento}`]);
  }
}
