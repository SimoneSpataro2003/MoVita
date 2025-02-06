import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserService} from '../../services/user/user.service';
import {Utente} from '../../model/Utente';
import {Loadable} from '../../model/Loadable';
import {ToastService} from '../../services/toast/toast.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit, Loadable {
  router = inject(Router);
  userId!: number;
  user!: Utente;
  loaded: boolean = false;

  applyForm = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.pattern(/[A-Z][a-z]+/)]),
    personaCognome: new FormControl('', [Validators.required, Validators.pattern(/[A-Z][a-z]+/)]),
    //username: new FormControl('', [Validators.required, Validators.pattern(/[a-zA-Z0-9]+/)]),
    //email: new FormControl('', [Validators.required, Validators.pattern(/(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])/)]),
    //password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
    citta: new FormControl('', [Validators.required, Validators.pattern(/[a-zA-Z ]+/)]),
    aziendaIndirizzo: new FormControl('', [Validators.required, Validators.pattern(/[a-zA-z0-9 ]+/)]),
    aziendaRecapito: new FormControl('', [Validators.required, Validators.pattern(/[0-9]{10}/)]),
    aziendaPartitaIva: new FormControl('', [Validators.required, Validators.pattern(/[0-9]{11}/)])
  });

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private toastService: ToastService
  ) {
  }

  ngOnInit() {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe(
        (data) => {
          this.user = data;
          this.loaded = true;

          // Popoliamo il form con i dati dell'utente
          this.applyForm.patchValue({
            nome: this.user.nome,
            personaCognome: this.user.personaCognome,  // Evitiamo errori con `undefined`
            //username: this.user.username,
            //email: this.user.email,
            citta: this.user.citta,
            aziendaIndirizzo: this.user.aziendaIndirizzo,
            aziendaRecapito: this.user.aziendaRecapito,
            aziendaPartitaIva: this.user.aziendaPartitaIva
          });
        },
        (error) => {
          this.toastService.show('errorToast',"Errore", "Impossibile Caricare l'utente. \n Prova a ricaricare la pagina.");
        }
      );
    } else {
      // TODO: errore ID utente non valido
    }
  }

  updatePerson() {
    const body = {
      nome: this.applyForm.value.nome,
      personaCognome: this.applyForm.value.personaCognome,
      citta: this.applyForm.value.citta
    };
    this.userService.updatePerson(this.userId, body).subscribe(
      (data) => {
        this.user = data;
        this.goProfile();
        this.toastService.show('successToast',"Modifica effettuata", "Il profilo è stato modificato con successo.");
      },
      (error) => {
        this.toastService.show('errorToast',"Errore", "Impossibile aggiornare il profilo. Prova a ricaricare la pagina.");
      }
    );
  }

  updateAgency() {
    const body = {
      nome: this.applyForm.value.nome,
      citta: this.applyForm.value.citta,
      aziendaPartitaIva: this.applyForm.value.aziendaPartitaIva,
      aziendaIndirizzo: this.applyForm.value.aziendaIndirizzo,
      aziendaRecapito: this.applyForm.value.aziendaRecapito
    };
    this.userService.updateAgency(this.userId, body).subscribe(
      (data) => {
        this.user = data;
        this.goProfile();
        this.toastService.show('successToast',"Modifica effettuata", "Il profilo è stato modificato con successo.");
      },
      (error) => {
        this.toastService.show('successToast',"Errore", "Non è stato possibile modificare il profilo. Prova a ricaricare la pagina.");
      }
    );
  }

  goProfile() {
    this.router.navigate(['/profile']);
  }

  isLoaded(): boolean {
    return this.loaded;
  }
}
