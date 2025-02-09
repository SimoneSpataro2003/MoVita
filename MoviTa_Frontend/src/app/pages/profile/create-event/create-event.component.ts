import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgIf, NgForOf, NgClass } from '@angular/common';
import { EventService } from '../../../services/event/event.service';
import { RouterLink } from '@angular/router';
import { Categoria } from '../../../model/Categoria';
import { CategoryService } from '../../../services/category/category.service';
import { Utente } from '../../../model/Utente';
import { CookieService } from 'ngx-cookie-service';
import { Evento } from '../../../model/Evento';
import { ToastService } from '../../../services/toast/toast.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './create-event.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    FormsModule
  ],
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  eventForm: FormGroup;
  imagePreviews: string[] = [];
  allCategories: Categoria[] = [];
  private currentUserId: number = 0;
  utente: Utente | null = null;

  constructor(
    private eventService: EventService,
    private categoryService: CategoryService,
    private cookieService: CookieService,
    private toastService: ToastService
  ) {
    this.utente = JSON.parse(this.cookieService.get('utente'));
    if(this.utente!=null){
      this.currentUserId = this.utente.id;
    }

    this.eventForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      price: new FormControl(0, Validators.required),
      city: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      maxParticipants: new FormControl(0, Validators.required),
      minAge: new FormControl(0, Validators.required),
      description: new FormControl('', Validators.required),
      selectedCategory: new FormControl(''),
      selectedCategories: new FormControl<string[]>([]),
      images: new FormControl<File[]>([]),
      capacity: new FormControl(1, [Validators.required, Validators.min(1)]) 
    });
  }

 ngOnInit(): void {
    this.categoryService.findAll().subscribe(
      {
        next:(data) => {
          this.allCategories = data;
          console.log("Categorie arrivate");
        },
        error: (error) => {
          console.log("Errore nel recupero delle categorie");
        }
      }
    );
  }

  // Getter per accedere facilmente a selectedCategories
  get selectedCategories(): string[] {
    return this.eventForm.get('selectedCategories')?.value || [];
  }

  addCategory() {
    const category = this.eventForm.get('selectedCategory')?.value;
    if (category && !this.selectedCategories.includes(category)) {
      this.eventForm.get('selectedCategories')?.setValue([...this.selectedCategories, category]);
      this.eventForm.get('selectedCategory')?.setValue(''); // Reset selected category
    }
  }

  removeCategory(category: string) {
    const updatedCategories = this.selectedCategories.filter(cat => cat !== category);
    this.eventForm.get('selectedCategories')?.setValue(updatedCategories);
  }

  availableCategories() {
    return this.allCategories.filter(cat => !this.selectedCategories.includes(cat.nome));
  }

  onImageUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const files = Array.from(input.files);
      const currentImages = this.eventForm.get('images')?.value || [];
      const updatedImages = [...currentImages, ...files];

      this.eventForm.get('images')?.setValue(updatedImages);
      this.imagePreviews = updatedImages.map(file => URL.createObjectURL(file));
    }
  }

  validaData(data: string): boolean {
    const dateTimePattern = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
    return dateTimePattern.test(data); 
  }
  seValido():boolean{
    
    return (this.eventForm.get('title')?.value!=='') && this.validaData(this.eventForm.get('date')?.value) &&(this.eventForm.get('price')?.value!=='') && (this.eventForm.get('city')?.value!=='') && (this.eventForm.get('address')?.value!=='') && (this.eventForm.get('capacity')?.value!=='') && (this.eventForm.get('minAge')?.value!=='');
     
  }

  createEvent() {    
    if (this.seValido()) {
    console.log("VALIDIIIIII");
    const formData = new FormData();
    Object.keys(this.eventForm.controls).forEach(key => {
      const control = this.eventForm.get(key);
      if (control) {
        if (key === 'images') {
          const files = control.value as File[];
          if (files) {
            files.forEach((file) => {
              formData.append('images', file, file.name);
            });
          }
        } else if (key === 'selectedCategories') {
          formData.append(key, JSON.stringify(control.value));
        } else {
          formData.append(key, control.value);
        }
      }
    });

    formData.append('creatorId', this.currentUserId.toString());

    const evento: any = {
      nome: this.eventForm.get('title')?.value,
      data: this.eventForm.get('date')?.value,
      prezzo: this.eventForm.get('price')?.value,
      descrizione: this.eventForm.get('description')?.value,
      citta: this.eventForm.get('city')?.value,
      indirizzo: this.eventForm.get('address')?.value,
      numPartecipanti: 0,
      maxNumPartecipanti: this.eventForm.get('capacity')?.value,
      etaMinima: this.eventForm.get('minAge')?.value,
      creatore: {
        id: this.currentUserId,
        nome: this.utente?.nome!,
        email: this.utente?.email!
      }
    };

    this.eventService.creaEvento(evento).subscribe({
      next: (response: Evento) => {
        this.toastService.show('successToast', 'Evento Creato!!!', "Evento Creato con successo");
        const evento_id = response.id;

        const images = this.eventForm.get('images')?.value as File[];
        
        for(let i of images) {
          
            console.log("Lunghezza")
            console.log(images.length)
            this.eventService.setEventImage(evento_id, i).subscribe({
              next: (data) => { 
                console.log(data);
              },
              error: (err) => {
                this.toastService.show('errorToast', 'Errore', "Immagini non inviate.\n Prova a ricaricaricare la pagina.");                
              }
            });
          
        }
        
        let categorie_id: number[] = [];
        for(let j of this.selectedCategories){
          for(let k of this.allCategories){
            if(k.nome === j)
            {
              categorie_id.push(k.id);
            }
          }
        }    
        if(categorie_id.length > 0)
        {
          this.categoryService.insertEventCategories(evento_id,categorie_id).subscribe(
            {
              next: (data) =>{
                console.log("Categorie caricate on successo",data);
              },
              error: (error) => {
                this.toastService.show('errorToast', 'Errore', "Immagini invio categorie.\n Prova a ricaricaricare la pagina.");                
              }
            }
          );
        }

      },
      error: (error) => {
        this.toastService.show('errorToast', 'Errore', "Errore durante la creazione dell'evento.\n Prova a ricaricaricare la pagina.");                
        
      }
    });
     } else {
      this.toastService.show('errorToast', 'Errore', "Form non valido.\n Compila correttamente il form e inserisci la data nel corretto formato");
        
     }
  }

  removeImage(index: number) {
    const currentImages = this.eventForm.get('images')?.value as File[];
    currentImages.splice(index, 1);
    this.eventForm.get('images')?.setValue(currentImages);

    this.imagePreviews = currentImages.map(file => URL.createObjectURL(file));
  }
}
