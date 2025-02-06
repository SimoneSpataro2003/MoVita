import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgIf, NgForOf } from '@angular/common';
import { EventService } from '../../../services/event/event.service';
import { RouterLink } from '@angular/router';
import { CategorieFiltroComponent } from '../../events/categorie-filtro/categorie-filtro.component';  // Adjust the import based on your structure
import { Categoria } from '../../../model/Categoria';
import { CategoryService } from '../../../services/category/category.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './create-event.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    FormsModule,
    RouterLink
  ],
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit, AfterViewInit {
  eventForm: FormGroup;
  selectedCategory: string = '';
  imagePreviews: string[] = [];
  allCategories: Categoria[] = [];  // Store all categories here

  @ViewChild(CategorieFiltroComponent) categorieFiltroComponent: CategorieFiltroComponent | undefined;

  constructor(
    private eventService: EventService,
    private categoryService: CategoryService
  ) {
    this.eventForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      date: new FormControl('', Validators.required),
      price: new FormControl(0, Validators.required),
      city: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      maxParticipants: new FormControl(0, Validators.required),
      minAge: new FormControl(0, Validators.required),
      description: new FormControl('', Validators.required),
      selectedCategories: new FormControl<string[]>([]),
      images: new FormControl<File[]>([])
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    // Ensure categories are loaded after child component is available
    if (this.categorieFiltroComponent) {
      this.categoryService.findAll().subscribe(categories => {
        this.allCategories = categories;
        // Optional: Handle any additional logic after categories are loaded
      });
    }
  }

  addCategory() {
    const selectedCategories: string[] = this.eventForm.get('selectedCategories')?.value || [];
    if (this.selectedCategory && !selectedCategories.includes(this.selectedCategory)) {
      this.eventForm.get('selectedCategories')!.setValue([...selectedCategories, this.selectedCategory]);
      this.selectedCategory = '';
    }
  }

  removeCategory(category: string) {
    const selectedCategories: string[] = this.eventForm.get('selectedCategories')?.value || [];
    this.eventForm.get('selectedCategories')!.setValue(selectedCategories.filter(cat => cat !== category));
  }

  availableCategories() {
    const selectedCategories = this.eventForm.get('selectedCategories')?.value || [];
    return this.allCategories.filter(cat => !selectedCategories.includes(cat.id));
  }

  onImageUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const files: File[] = Array.from(input.files);
      this.eventForm.get('images')!.setValue(files);

      this.imagePreviews = [];
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          if (e.target?.result) {
            this.imagePreviews.push(e.target.result as string);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  }

  createEvent() {
    if (this.eventForm.valid) {
      console.log('Evento creato:', this.eventForm.value);

      const body = {
        title: this.eventForm.value.title,
        date: this.eventForm.value.date,
        price: this.eventForm.value.price,
        city: this.eventForm.value.city,
        address: this.eventForm.value.address,
        maxParticipants: this.eventForm.value.maxParticipants,
        minAge: this.eventForm.value.minAge,
        description: this.eventForm.value.description,
      };

      this.eventService.creaEvento(body).subscribe({
        next: (response: any) => {
          console.log(response);
        },
        error: (err: any) => {
          console.error('Error creating event:', err);
        }
      });

      this.imagePreviews = this.eventForm.value.images;
      this.selectedCategory = this.eventForm.value.selectedCategories;
    }
  }

  removeImage(i: number) {
    // Remove the image at index 'i' from imagePreviews
    this.imagePreviews.splice(i, 1);

    // Update the images form control to remove the corresponding file as well
    const updatedImages = [...this.eventForm.value.images];
    updatedImages.splice(i, 1);
    this.eventForm.get('images')!.setValue(updatedImages);
  }
}
