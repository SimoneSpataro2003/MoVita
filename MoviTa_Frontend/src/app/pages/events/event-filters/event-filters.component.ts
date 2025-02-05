import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import {EventService} from '../../../services/event/event.service';
import {Evento} from '../../../model/Evento';
import {IconaCategoriaMapper} from '../../../model/IconaCategoriaMapper';
import {ConsigliEventoComponent} from '../consigli-evento/consigli-evento.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CategorieFiltroComponent} from '../categorie-filtro/categorie-filtro.component';

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
  @Output() ottieniEventi = new EventEmitter<Evento[]>();

  constructor(private fb: FormBuilder,
              private cookieService: CookieService,
              private eventService: EventService,
              private modalService: NgbModal) {

    this.filterForm = this.fb.group({
      creatore:[''],
      nome: [''],
      citta: [''],
      prezzoMax: [1000],
      etaMinima: [''],
      valutazioneMedia: [0],
      almenoMetaPartecipanti: [false],
      categorie: [[]],
    });
  }

  get filterSummary(): string {
    const { creatore, nome, citta, prezzoMax, etaMinima, valutazioneMedia, almenoMetaPartecipanti, categorie } = this.filterForm.value;
    let summary = [];

    if(creatore) summary.push(`creatore: "${creatore}"`);
    if (nome) summary.push(`Nome: "${nome}"`);
    if (citta) summary.push(`Città: "${citta}"`);
    if (prezzoMax < 1000) summary.push(`Prezzo ≤ ${prezzoMax}€`);
    if (etaMinima) summary.push(`Età ≥ ${etaMinima}`);
    if (valutazioneMedia > 0) summary.push(`Valutazione ≥ ${valutazioneMedia}★`);
    if (almenoMetaPartecipanti) summary.push(`≥ 50% iscritti`);
    if (categorie.length) summary.push(`Categorie scelte: ${categorie.length}`);

    return summary.length ? summary.join(' | ') : 'Nessun filtro selezionato';
  }

  getEventsByFilter(){
    const body = {
      usernameCreatore: this.filterForm.value.creatore,
      nome: this.filterForm.value.nome,
      citta: this.filterForm.value.citta,
      etaMinima: this.filterForm.value.etaMinima,
      prezzoMassimo:this.filterForm.value.prezzoMax,
      valutazioneMedia: this.filterForm.value.valutazioneMedia,
      almenoMetaPartecipanti: this.filterForm.value.almenoMetaPartecipanti,
      categorieId: this.filterForm.value.categorie
    }

    this.eventService.getEventsByFilter(body).subscribe({
      next: (eventi: Evento[])=>{
        console.log(eventi);
        this.ottieniEventi.emit(eventi);
      },
      error:(err) =>{
        //TODO: messaggio di errore!
      }
    });
  }

  resetFilters() {
    this.filterForm.reset({ prezzoMax: 1000, valutazioneMedia: 0, almenoMetaPartecipanti: false, categorie: [] });
  }

  protected readonly IconaCategoriaMapper = IconaCategoriaMapper;

  openCategoryFilterModal() {
    if (typeof window !== "undefined") {
      const modalRef = this.modalService.open(CategorieFiltroComponent, {centered: true, scrollable:true});
      //passo al modale un riferimento a se stesso, così da potersi chiudere dall'interno.
      modalRef.componentInstance.thisModal = modalRef;
      modalRef.componentInstance.categorieScelte = [...this.filterForm.value.categorie];

      modalRef.componentInstance.ottieniCategorieScelte.subscribe((categorieScelte: Array<number>) => {
        console.log(categorieScelte);
        this.filterForm.patchValue({ categorie: categorieScelte });
      });
    }
  }

  get categorie(){
    let cat: number[] = this.filterForm.value.categorie;
    return cat;
  }
}
