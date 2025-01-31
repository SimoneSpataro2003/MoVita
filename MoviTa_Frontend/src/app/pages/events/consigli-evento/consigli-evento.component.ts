import {Component, Input, OnInit} from '@angular/core';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Categoria} from '../../../model/Categoria';
import {CategoryService} from '../../../services/category/category.service';
import {Evento} from '../../../model/Evento';
import {Loadable} from '../../../model/Loadable';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-consigli-evento',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './consigli-evento.component.html',
  styleUrl: './consigli-evento.component.css'
})
export class ConsigliEventoComponent implements OnInit,Loadable{
  @Input() thisModal!: NgbModalRef;
  categorie !: Categoria[];
  categorieScelte = new Array<Categoria>();
  loaded: boolean = false;

  constructor(private categoriyService:CategoryService) {

  }

  ngOnInit() {
    this.showAllCategories();
  }

  showAllCategories(){
    this.categoriyService.findAll().subscribe({
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

  closeModal() {
    this.thisModal.close();
  }

  isLoaded(): boolean {
    return this.loaded;
  }

  select(categoria: Categoria) {
    const index = this.categorieScelte.indexOf(categoria);
    if (index !== -1) {
      this.categorieScelte.splice(index, 1);  // Rimuove 1 elemento all'indice trovato
    }else{
      this.categorieScelte.push(categoria);
    }
  }

  isSelected(categoria:Categoria){
    return this.categorieScelte.includes(categoria);
  }

}
