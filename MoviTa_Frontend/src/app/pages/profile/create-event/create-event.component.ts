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

@Component({
  selector: 'app-event-form',
  templateUrl: './create-event.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    FormsModule,
    NgClass,
  ],
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  eventForm: FormGroup;
  imagePreviews: string[] = [];
  allCategories: Categoria[] = [];
  private currentUserId: number;

  constructor(
    private eventService: EventService,
    private categoryService: CategoryService,
    private cookieService: CookieService,
  ) {
    let utente: Utente = JSON.parse(this.cookieService.get('utente'));
    this.currentUserId = utente.id;

    this.eventForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      date: new FormControl('', Validators.required),
      price: new FormControl(0, Validators.required),
      city: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      maxParticipants: new FormControl(0, Validators.required),
      minAge: new FormControl(0, Validators.required),
      description: new FormControl('', Validators.required),
      selectedCategory: new FormControl(''),
      selectedCategories: new FormControl<string[]>([]),
      images: new FormControl<File[]>([])
    });
  }

  ngOnInit(): void {
    this.categoryService.findAll().subscribe(categories => {
      this.allCategories = categories;
      console.log(this.allCategories);
    });
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

  createEvent() {
    if (this.eventForm.valid) {
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

      this.eventService.creaEvento(formData).subscribe({
        next: (response: Evento) => {
          console.log('Evento creato con successo:', response);
          const evento_id = response.id;

          // Insert all selected categories into the event
          const selectedCategories = this.selectedCategories;
          selectedCategories.forEach(category => {
            this.eventService.insertCategoryToEvent(evento_id, category).subscribe({
              next: (res) => {
                console.log(`Categoria ${category} aggiunta con successo all'evento.`);
              },
              error: (err) => {
                console.error(`Errore durante l'inserimento della categoria ${category}:`, err);
              }
            });
          });

          const images = this.eventForm.get('images')?.value as File[];
          if (images.length > 0) {
            const imageUploadRequests = images.map((image) =>
              this.eventService.setEventImage(evento_id, image)
            );

            Promise.all(imageUploadRequests).then(() => {
              console.log('Tutte le immagini caricate con successo');
              this.eventForm.reset();
              this.imagePreviews = [];
            }).catch((error) => {
              console.error('Errore durante il caricamento delle immagini:', error);
            });
          }
        },
        error: (error) => {
          console.error('Errore durante la creazione dell\'evento:', error);
        }
      });
    } else {
      console.log('Modulo non valido!');
    }
  }


  removeImage(index: number) {
    const currentImages = this.eventForm.get('images')?.value as File[];
    currentImages.splice(index, 1);
    this.eventForm.get('images')?.setValue(currentImages);

    this.imagePreviews = currentImages.map(file => URL.createObjectURL(file));
  }
}
