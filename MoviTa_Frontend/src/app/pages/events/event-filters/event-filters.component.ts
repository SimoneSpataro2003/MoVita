import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-event-filters',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './event-filters.component.html',
  styleUrl: './event-filters.component.css'
})
export class EventFiltersComponent {
  filterForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      nome: [''],
      citta: [''],
      prezzoMax: [1000],
      etaMinima: ['']
    });
  }

  get filterSummary(): string {
    const { nome, citta, prezzoMax, etaMinima } = this.filterForm.value;
    let summary = [];

    if (nome) summary.push(`Nome: "${nome}"`);
    if (citta) summary.push(`Città: "${citta}"`);
    if (prezzoMax < 1000) summary.push(`Prezzo ≤ ${prezzoMax}€`);
    if (etaMinima) summary.push(`Età ≥ ${etaMinima}`);

    return summary.length ? summary.join(' | ') : 'Nessun filtro selezionato';
  }

  resetFilters() {
    this.filterForm.reset({ prezzoMax: 1000 });
  }
}
