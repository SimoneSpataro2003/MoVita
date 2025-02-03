import { Component, ViewChild } from '@angular/core';
import { Evento } from '../../model/Evento';
import { CommonModule } from '@angular/common';
import { EventService } from '../../services/event/event.service';
import { ActivatedRoute } from '@angular/router';
import { Partecipazione } from '../../model/Partecipazione';
import { CategoryService } from '../../services/category/category.service';
import { Categoria } from '../../model/Categoria';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user/user.service';
import { CarouselEventImageComponent } from './carousel-event-image/carousel-event-image.component';
import { PartecipantiEventoComponent } from './partecipanti-evento/partecipanti-evento.component';
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, PartecipantiEventoComponent,CarouselEventImageComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {

  evento: Evento | null= null;
  partecipazioni: Partecipazione[] = [];
  eventiSimili : Evento[] = [];
  idEvento = 0;
  immaginiEvento: Blob[] = [];
  immagineVisibile: string ="";
  @ViewChild(CarouselEventImageComponent) carouselImage!: CarouselEventImageComponent;


  
  constructor(private route: ActivatedRoute, private eventService: EventService, private userService: UserService,  private categoryService: CategoryService, private cookieService: CookieService){ }

  ngOnInit(): void{
    this.idEvento = Number(this.route.snapshot.paramMap.get('id'));
    this.mostraDettagliEvento();        
    this.mostraPartecipazioniEvento();
    this.ottieniCategorieEvento();     
  }


  mostraDettagliEvento(): void {    
    if (this.idEvento) {
      this.eventService.getEventById(this.idEvento).subscribe({
        next: (data) => {
          this.evento = data;
          this.mostraDescrizioneEvento();
          this.caricaImmagineCreatoreEvento();     
          this.carouselImage.caricaNomiImmaginiEvento(this.evento); 
        },
        error: (err) => {
          console.error('Errore nel recupero dettagli evento', err);        
        }
      });      
    }  
  }

  mostraDescrizioneEvento():void{
    if (this.evento!== null &&  this.evento!== undefined) {
      this.eventService.getEventDescription(this.idEvento).subscribe(
        {
          next: (data) =>{
            this.evento!.descrizione = data.descrizione;
          },
          error: (err) => {
            console.error('Errore nel recupero descrizione evento', err);
          
          }
        }
      );
    }
  }

  mostraPartecipazioniEvento(): void {    
    if (this.idEvento) {
      this.eventService.getPartecipazioniByEvent(this.idEvento).subscribe({
        next: (data) => {
          this.partecipazioni = data;
          console.log(data);
         
        },
        error: (err) => {
          console.error('Errore nel recupero partecipazioni evento', err);
        
        }
      });      
    }  
  }
  
  ottieniCategorieEvento(){
    let categorie:Categoria[] = [];
    
    if (this.idEvento) {
      this.eventService.getCategories(this.idEvento).subscribe({
        next: (data) => {
          categorie = data;
          console.log("CATEGORIE");
          console.log(data);  
          console.log("FINE");
          this.mostraEventiSimili(categorie);        
        },
        error: (err) => {
          console.error('Errore nel recupero dettagli evento', err);
        }
      }); 
      
      return categorie;
    }
    return categorie; 
  }


  mostraEventiSimili(categorie: Categoria[] ): void { 
      
      console.log("CATEGORIE ARRIVATE");     
      for(let i of categorie) 
      {
        if (this.idEvento) {
          this.categoryService.findEventsByCategory(String(i.id)).subscribe({
            next: (data) => {
              const isUnique = (data: Evento[]) => {
                for (let dataItem of data) {
                  for(let eventItem of this.eventiSimili ){   
                    console.log(`${eventItem.id} ${dataItem.id}`)             
                    if(eventItem.id == dataItem.id)
                      return false;
                  }                  
                }
                return true;
              };

              if(isUnique(data))
              {
                this.eventiSimili = this.eventiSimili.concat(data);   
                console.log("Eventi simili")
                console.log(this.eventiSimili);
                console.log("Eventi simili")
                       
               
              }              
            
            },
            error: (err) => {
              console.error('Errore nel recupero eventi simili', err);
            
            }
          });      
        }  
    }
    
    
  }
  caricaImmagineCreatoreEvento():void{
    if(this.evento?.creatore !== undefined){
      this.userService.getImage(this.evento?.creatore?.id).subscribe(
        {
          next: (data) => {
            this.evento!.creatore.immagineProfilo = URL.createObjectURL(data); 
           
          },
          error: (err) => {
            console.error("Errore nel recupero dell'immagine del creatore dell'evento", err);
          
          }
        }
      );
    }
  }

 


}
