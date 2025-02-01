import {Component, Input, OnInit} from '@angular/core';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Categoria} from '../../../model/Categoria';
import {CategoryService} from '../../../services/category/category.service';
import {Evento} from '../../../model/Evento';
import {Loadable} from '../../../model/Loadable';
import {NgClass} from '@angular/common';
import {IconaCategoriaMapper} from "../../../model/IconaCategoriaMapper";
import {CookieService} from 'ngx-cookie-service';
import {Utente} from '../../../model/Utente';

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
  categorieScelte = new Array<number>();
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

  insertUserCategories() {
    //TODO: devi prendere il profilo dell'utente dai cookie!
    this.categoryService.insertUserCategories(3,this.categorieScelte).subscribe({
      next: () =>{
        //TODO: mostra succecco con una finestra popup!
        console.log("fatto!");
        //ho modificato i dati dell'utente: modifico il cookie!
        let utente: Utente = JSON.parse(this.cookieService.get('utente'));
        utente.mostraConsigliEventi = false;
        this.cookieService.set('utente',JSON.stringify(utente));
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
