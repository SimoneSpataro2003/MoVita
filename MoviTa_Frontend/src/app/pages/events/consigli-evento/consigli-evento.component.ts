import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Categoria} from '../../../model/Categoria';
import {CategoryService} from '../../../services/category/category.service';
import {Evento} from '../../../model/Evento';
import {Loadable} from '../../../model/Loadable';
import {NgClass} from '@angular/common';
import {IconaCategoriaMapper} from "../../../model/IconaCategoriaMapper";
import {CookieService} from 'ngx-cookie-service';
import {Utente} from '../../../model/Utente';
import {FormsModule} from '@angular/forms';
import {ToastService} from '../../../services/toast/toast.service';

@Component({
  selector: 'app-consigli-evento',
  standalone: true,
  imports: [
    NgClass,
    FormsModule
  ],
  templateUrl: './consigli-evento.component.html',
  styleUrl: './consigli-evento.component.css'
})
export class ConsigliEventoComponent implements OnInit,Loadable{
  @Input() thisModal!: NgbModalRef;
  categorie !: Categoria[];
  categorieScelte = new Array<number>();
  loaded: boolean = false;
  showConsigli: boolean = false;


  constructor(private categoryService:CategoryService,
              private cookieService: CookieService,
              private toastService: ToastService) {
  }

  ngOnInit() {
    this.showAllCategories();
  }

  showAllCategories() {
    this.categoryService.findAll().subscribe({
      next: (categorie: Categoria[]) => {
        this.categorie = categorie;
        //console.log(eventi);
        this.loaded = true;
      },
      error: (err) => {
        //TODO: mostra errore con una finestra popup!
        console.log(err)
      }
    })
  }

  insertUserCategories(){
    let utente: Utente = JSON.parse(this.cookieService.get('utente'));
    this.categoryService.insertUserCategories(utente.id,this.categorieScelte).subscribe({
      next: () =>{
        //ho modificato i dati dell'utente: modifico il cookie!
        let utente: Utente = JSON.parse(this.cookieService.get('utente'));
        utente.mostraConsigliEventi = false;
        this.cookieService.set('utente',JSON.stringify(utente));

        this.toastService.show('successToast', 'Fatto!', 'Categorie salvate correttamente.');
        this.closeModal();
      },
      error:(err) =>{
        this.toastService.show('errorToast', 'Errore', 'Impossibile salvare le categorie. Riprova.');
      }
    })
  }

  closeModal() {
    this.thisModal.close();
  }

  isLoaded(): boolean {
    return this.loaded;
  }

  select(categoria: Categoria) {
    const index = this.categorieScelte.indexOf(categoria.id);
    if (index !== -1) {
      this.categorieScelte.splice(index, 1);  // Rimuove 1 elemento all'indice trovato
    }else{
      this.categorieScelte.push(categoria.id);
    }
  }

  isSelected(categoria:Categoria){
    return this.categorieScelte.includes(categoria.id);
  }

    protected readonly IconaCategoriaMapper = IconaCategoriaMapper;
}
