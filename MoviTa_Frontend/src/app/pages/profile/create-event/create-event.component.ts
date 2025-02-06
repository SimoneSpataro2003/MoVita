import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {NgClass, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-event-form',
  templateUrl: './create-event.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    NgIf,
    NgForOf
  ],
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent {

  event = {
    title: '',
    date: '',
    price: 0,
    city: '',
    address: '',
    maxParticipants: 0,
    minAge: 0,
    description: '',
    selectedCategories: [] as string[]
  };

  selectedCategory: string = ''; // Categoria selezionata dalla combo box

  // Dynamic validation checks
  get validNome() { return this.event.title.length > 0 && this.event.title.length <= 20; }
  get validDate() { return !!this.event.date; }
  get validPrezzo() { return this.event.price > 0; }
  get validIndirizzo() { return this.event.address.trim().length > 0; }
  get validMaxPartecipanti() { return this.event.maxParticipants > 0 && this.event.maxParticipants <= 16; }
  get validEtaMinima() { return this.event.minAge > 0 && this.event.minAge <= 150; }
  get validDescrizione() { return this.event.description.trim().length > 0; }

  // Form validity check
  isFormValid() {
    return this.validNome && this.validDate && this.validPrezzo && this.validIndirizzo && this.validMaxPartecipanti && this.validEtaMinima && this.validDescrizione;
  }

  // Funzione per aggiungere la categoria selezionata alla lista
  addCategory() {
    if (this.selectedCategory && !this.event.selectedCategories.includes(this.selectedCategory)) {
      this.event.selectedCategories.push(this.selectedCategory);
      this.selectedCategory = ''; // Reset dopo l'aggiunta
    }
  }

  // Funzione per inviare il form
  onSubmit() {
    if (this.isFormValid()) {
      console.log('Evento creato:', this.event);
      // Aggiungi qui la logica per inviare i dati al server
    }
  }
}
