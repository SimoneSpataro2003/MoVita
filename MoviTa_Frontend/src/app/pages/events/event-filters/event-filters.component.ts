import {ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import {EventService} from '../../../services/event/event.service';
import {Evento} from '../../../model/Evento';
import {IconaCategoriaMapper} from '../../../model/IconaCategoriaMapper';
import {ConsigliEventoComponent} from '../consigli-evento/consigli-evento.component';
import {NgbModal, NgbOffcanvasRef} from '@ng-bootstrap/ng-bootstrap';
import {CategorieFiltroComponent} from '../categorie-filtro/categorie-filtro.component';
import {ToastService} from '../../../services/toast/toast.service';
import {Utente} from '../../../model/Utente';
import {UserService} from '../../../services/user/user.service';
import {Categoria} from '../../../model/Categoria';

@Component({
  selector: 'app-event-filters',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './event-filters.component.html',
  styleUrl: './event-filters.component.css'
})
export class EventFiltersComponent implements OnChanges{

  @Input() filterForm!: FormGroup;
  @Input() thisOffCanvas!: NgbOffcanvasRef;
  @Input() filterSummary !: string;
  @Output() ottieniEventi = new EventEmitter<Evento[]>();
  @Output() ottieniFilterSummary = new EventEmitter<string>();
  @Output() ottieniFormGroup = new EventEmitter<FormGroup>();

  constructor(private fb: FormBuilder,
              private cookieService: CookieService,
              private eventService: EventService,
              private userService: UserService,
              private modalService: NgbModal,
              private toastService: ToastService) {

    if(!this.filterForm){
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
  }

  updateFilterSummary() {
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

    this.filterSummary = summary.length ? summary.join(' | ') : 'Nessun filtro selezionato';
    this.ottieniFilterSummary.emit(this.filterSummary);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateFilterSummary()
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
        this.ottieniEventi.emit(eventi);
        this.ottieniFormGroup.emit(this.filterForm);
      },
      error:(err) =>{
        this.toastService.show('errorToast', 'Errore', 'Errore nel reperire gli eventi.\n Prova a ricaricaricare la pagina.');
      }
    });

    //this.thisOffCanvas.close();
  }

  resetFilters() {
    this.filterForm.reset({ prezzoMax: 1000, valutazioneMedia: 0, almenoMetaPartecipanti: false, categorie: [] });
    this.updateFilterSummary();

    this.getEventsByFilter();
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
        this.updateFilterSummary();
      });
    }
  }

  get categorie(){
    let cat: number[] = this.filterForm.value.categorie;
    return cat;
  }

  get prezzoMax(){
    return this.filterForm.value.prezzoMax;
  }


}
