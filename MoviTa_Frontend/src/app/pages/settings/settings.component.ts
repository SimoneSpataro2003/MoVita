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
  submitted: boolean = false;

  personForm = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.pattern(/[A-Z][a-z]+/)]),
    personaCognome: new FormControl('', [Validators.required, Validators.pattern(/[A-Z][a-z]+/)]),
    citta: new FormControl('', [Validators.required, Validators.pattern(/[a-zA-Z ]+/)])
  });

  agencyForm = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.pattern(/[A-Z][a-z]+/)]),
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

          if(!this.user.azienda) {
            this.personForm.patchValue({
              nome: this.user.nome,
              personaCognome: this.user.personaCognome,
              citta: this.user.citta
            });
          } else {
            this.agencyForm.patchValue({
              nome: this.user.nome,
              citta: this.user.citta,
              aziendaIndirizzo: this.user.aziendaIndirizzo,
              aziendaRecapito: this.user.aziendaRecapito,
              aziendaPartitaIva: this.user.aziendaPartitaIva
            });
          }

        },
        (error) => {
          this.toastService.show('errorToast',"Errore", "Impossibile Caricare l'utente. \n Prova a ricaricare la pagina.");
        }
      );
    } else {
      //errore
    }
  }

  updatePerson() {
    this.submitted = true;
    if (this.personForm.invalid) {
      return;
    }
    console.log("avanti");
    const body = {
      nome: this.personForm.value.nome,
      personaCognome: this.personForm.value.personaCognome,
      citta: this.personForm.value.citta
    };
    this.userService.updatePerson(this.userId, body).subscribe({
      next: (data: any) => {
        this.user = data;
        this.goProfile();
        this.toastService.show('successToast',"Modifica effettuata", "Il profilo è stato modificato con successo.");
      },
      error: (any) => {
        this.toastService.show('errorToast',"Errore", "Impossibile aggiornare il profilo. Prova a ricaricare la pagina.");
      }
    });
  }

  updateAgency() {
    this.submitted = true;
    if (this.agencyForm.invalid) {
      return;
    }
    const body = {
      nome: this.agencyForm.value.nome,
      citta: this.agencyForm.value.citta,
      aziendaPartitaIva: this.agencyForm.value.aziendaPartitaIva,
      aziendaIndirizzo: this.agencyForm.value.aziendaIndirizzo,
      aziendaRecapito: this.agencyForm.value.aziendaRecapito
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
    this.router.navigate(['/profile/', this.userId]);
  }

  isLoaded(): boolean {
    return this.loaded;
  }
}
