import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, ActivatedRoute, RouterLink} from '@angular/router';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserService} from '../../services/user/user.service';
import {Utente} from '../../model/Utente';
import {Loadable} from '../../model/Loadable';
import {ToastService} from '../../services/toast/toast.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit, Loadable {
  router = inject(Router);
  userId!: number;
  user!: Utente;
  loaded: boolean = false;
  submitted: boolean = false;
  imagePreviews: string[] = [];

  personForm = new FormGroup({
    //username:new FormControl('', [Validators.required, Validators.pattern(/[a-zA-Z0-9]+/)]),
    nome: new FormControl('', [Validators.required, Validators.pattern(/[A-Z][a-z]+/)]),
    personaCognome: new FormControl('', [Validators.required, Validators.pattern(/[A-Z][a-z]+/)]),
    citta: new FormControl('', [Validators.required, Validators.pattern(/[a-zA-Z ]+/)]),
    vecchiaPassword: new FormControl(''),
    nuovaPassword: new FormControl('', [Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
    ripetiNuovaPassword: new FormControl('')
  });

  agencyForm = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.pattern(/[A-Z][a-z]+/)]),
    citta: new FormControl('', [Validators.required, Validators.pattern(/[a-zA-Z ]+/)]),
    aziendaIndirizzo: new FormControl('', [Validators.required, Validators.pattern(/[a-zA-z0-9 ]+/)]),
    aziendaRecapito: new FormControl('', [Validators.required, Validators.pattern(/[0-9]{10}/)]),
    aziendaPartitaIva: new FormControl('', [Validators.required, Validators.pattern(/[0-9]{11}/)]),
    vecchiaPassword: new FormControl(''),
    nuovaPassword: new FormControl('', [Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
    ripetiNuovaPassword: new FormControl('')
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
      this.userService.getUserById(this.userId).subscribe({
        next: (data: any) => {
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
        error: (any) => {
          this.toastService.show('errorToast',"Errore", "Impossibile Caricare l'utente. \n Prova a ricaricare la pagina.");
        }
      });
    } else {
      //errore
    }
  }

  updatePerson() {
    this.submitted = true;
    if (this.personForm.invalid) {
      return;
    }
    const body = {
      nome: this.personForm.value.nome,
      personaCognome: this.personForm.value.personaCognome,
      citta: this.personForm.value.citta
    };
    this.userService.updatePerson(this.userId, body).subscribe({
      next: (data: any) => {
        this.user = data;
        this.toastService.show('successToast',"Modifica effettuata", "Il profilo è stato modificato con successo.");
      },
      error: (any) => {
        this.toastService.show('errorToast',"Errore", "Impossibile aggiornare il profilo. Prova a ricaricare la pagina.");
      }
    });

    //TODO: fixare
    /*
    if (this.personForm.value.vecchiaPassword != "" &&
        this.personForm.value.nuovaPassword != "" &&
        this.personForm.value.ripetiNuovaPassword != "") {
      this.userService.updatePassword(this.userId, this.personForm.value.nuovaPassword).subscribe({
        next: (data: any) => {
          this.user = data;
          this.toastService.show('successToast', "Modifica effettuata", "La password è stato aggiornata con successo.");
        },
        error: (any) => {
          this.toastService.show('errorToast', "Errore", "Impossibile aggiornare la password.");
        }
      });
    }
    */

    if (this.imagePreviews.length == 1) { //ho effettivamente caricato un immagine
      this.userService.setUserImage(this.userId, this.imagePreviews[0]).subscribe({
        next: (data: any) => {
          this.toastService.show('successToast',"Modifica effettuata", "Il profilo è stato modificato con successo.");
        },
        error: (any) => {
          this.toastService.show('errorToast', "Errore", "Impossibile aggiornare l'immagine profilo.");
        }
      });
    }
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
    this.userService.updateAgency(this.userId, body).subscribe({
      next: (data: any) => {
        this.user = data;
        this.goProfile();
        this.toastService.show('successToast', "Modifica effettuata", "Il profilo è stato modificato con successo.");
      },
      error: (any) => {
        this.toastService.show('successToast', "Errore", "Non è stato possibile modificare il profilo. Prova a ricaricare la pagina.");
      }
    });

    this.userService.updatePassword(this.userId, this.agencyForm.value.nuovaPassword).subscribe({
      next: (data: any) => {
        this.user = data;
        this.toastService.show('successToast',"Modifica effettuata", "Il profilo è stato modificato con successo.");
      },
      error: (any) => {
        this.toastService.show('errorToast',"Errore", "Impossibile aggiornare il profilo. Prova a ricaricare la pagina.");
      }
    });
  }

  isPasswordCorrect(){
    if (!this.user.azienda) {
      return this.personForm.value.vecchiaPassword == this.user.password;
    } else {
      return this.agencyForm.value.vecchiaPassword == this.user.password;
    }
  }

  isTheSame() {
    if (!this.user.azienda) {
      return this.personForm.value.nuovaPassword == this.personForm.value.ripetiNuovaPassword;
    } else {
      return this.agencyForm.value.nuovaPassword == this.agencyForm.value.ripetiNuovaPassword;
    }
  }

  onImageUpload(form: FormGroup) {
    const input = document.getElementById('personaImageUpload') as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      const file = input.files[0];  // Prendiamo solo il primo file caricato
      form.get('images')?.setValue([file]);  // Impostiamo il form con il file selezionato
      this.imagePreviews = [URL.createObjectURL(file)];  // Creiamo la preview dell'immagine
    }
  }

  removeImage(form: FormGroup, id: string) {
    // Rimuovi l'immagine
    form.get('images')?.setValue([]);
    this.imagePreviews = [];  // Rimuovi l'anteprima
    const input = document.getElementById(id) as HTMLInputElement;
    if (input) {
      input.value = '';  // Reset del valore dell'input file
    }
  }

  goProfile() {
    this.router.navigate(['/profile/', this.userId]);
  }

  isLoaded(): boolean {
    return this.loaded;
  }
}
