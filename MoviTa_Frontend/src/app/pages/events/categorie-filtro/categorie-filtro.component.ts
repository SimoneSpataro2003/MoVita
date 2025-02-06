import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Categoria} from '../../../model/Categoria';
import {CategoryService} from '../../../services/category/category.service';
import {CookieService} from 'ngx-cookie-service';
import {Utente} from '../../../model/Utente';
import {IconaCategoriaMapper} from '../../../model/IconaCategoriaMapper';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-categorie-filtro',
  standalone: true,
  imports: [
    FormsModule,
    NgClass
  ],
  templateUrl: './categorie-filtro.component.html',
  styleUrl: './categorie-filtro.component.css'
})
export class CategorieFiltroComponent {
  @Input() thisModal!: NgbModalRef;
  @Input() categorieScelte = new Array<number>();
  @Output() ottieniCategorieScelte = new EventEmitter<Array<number>>
  categorie !: Categoria[];
  loaded: boolean = false;


  constructor(private categoryService:CategoryService,
              private cookieService: CookieService) {
  }

  ngOnInit() {
    this.showAllCategories();
  }

  showAllCategories(){
    this.categoryService.findAll().subscribe({
      next: (categorie: Categoria[]) =>{
        this.categorie = categorie;
        //console.log(eventi);
        this.loaded = true;
      },
      error:(err) =>{
        //TODO: mostra errore con una finestra popup!
        console.log(err)
      }
    })
  }

  returnCategories() {
    this.ottieniCategorieScelte.emit(this.categorieScelte);
    this.thisModal.close();
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

  // Function to return the array of all categories
  getAllCategories(): Categoria[] {
    return this.categorie;
  }


  protected readonly IconaCategoriaMapper = IconaCategoriaMapper;
}
