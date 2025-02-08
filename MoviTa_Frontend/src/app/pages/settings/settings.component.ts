import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, ActivatedRoute, RouterLink} from '@angular/router';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule, ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {UserService} from '../../services/user/user.service';
import {Utente} from '../../model/Utente';
import {Loadable} from '../../model/Loadable';
import {ToastService} from '../../services/toast/toast.service';

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const nuovaPasswordControl = control.get('nuovaPassword');
  const ripetiNuovaPasswordControl = control.get('ripetiNuovaPassword');

  // Se uno dei controlli non esiste, non eseguire ulteriori validazioni
  if (!nuovaPasswordControl || !ripetiNuovaPasswordControl) {
    return null;
  }

  const nuovaPassword = nuovaPasswordControl.value;
  const ripetiNuovaPassword = ripetiNuovaPasswordControl.value;

  // Se entrambi i campi sono vuoti, non segnalare errori
  if (!nuovaPassword && !ripetiNuovaPassword) {
    return null;
  }

  // Se i campi sono stati compilati in modo incoerente, ritorna un errore
  if (nuovaPassword !== ripetiNuovaPassword) {
    return { passwordMismatch: true };
  }

  // Altrimenti, le password coincidono
  return null;
};



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
    nome: new FormControl('', [Validators.required, Validators.pattern(/[A-Z][a-z]+/)]),
    personaCognome: new FormControl('', [Validators.required, Validators.pattern(/[A-Z][a-z]+/)]),
    email: new FormControl('', [Validators.required ,Validators.pattern(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)]),
    citta: new FormControl('', [Validators.required, Validators.pattern(/[a-zA-Z ]+/)]),
    nuovaPassword: new FormControl('', [Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
    ripetiNuovaPassword: new FormControl('', [Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)])
  }, { validators: passwordMatchValidator });

  agencyForm = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.pattern(/[A-Z][a-z]+/)]),
    email: new FormControl('', [Validators.required,Validators.pattern(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)]),
    citta: new FormControl('', [Validators.required, Validators.pattern(/[a-zA-Z ]+/)]),
    aziendaIndirizzo: new FormControl('', [Validators.required, Validators.pattern(/[a-zA-z0-9 ]+/)]),
    aziendaRecapito: new FormControl('', [Validators.required, Validators.pattern(/[0-9]{10}/)]),
    aziendaPartitaIva: new FormControl('', [Validators.required, Validators.pattern(/[0-9]{11}/)]),
    nuovaPassword: new FormControl('', [Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
    ripetiNuovaPassword: new FormControl('')
  }, { validators: passwordMatchValidator });

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
              email: this.user.email,
              citta: this.user.citta
            });
          } else {
            this.agencyForm.patchValue({
              nome: this.user.nome,
              email: this.user.email,
              citta: this.user.citta,
              aziendaIndirizzo: this.user.aziendaIndirizzo,
              aziendaRecapito: this.user.aziendaRecapito,
              aziendaPartitaIva: this.user.aziendaPartitaIva
            });
          }

        },
        error: (any) => {
          this.toastService.show('errorToast',"Errore", "Impossibile Caricare l'utente. Prova a ricaricare la pagina.");
        }
      });
    } else {
      //errore
    }
  }

  updatePerson() {
    this.submitted = true;
    if (this.personForm.invalid) {
      this.toastService.show('errorToast',"Errore", "Impossibile aggiornare il profilo. Prova a ricaricare la pagina.");
      return;
    }
    const body = {
      nome: this.personForm.value.nome,
      personaCognome: this.personForm.value.personaCognome,
      email: this.personForm.value.email,
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

    // password
    if (this.personForm.value.nuovaPassword != "" &&
        this.personForm.value.ripetiNuovaPassword != "") {
      this.userService.updatePassword(this.userId, this.personForm.value.nuovaPassword || "").subscribe({
        next: (data: any) => {
          this.user = data;
          this.toastService.show('successToast', "Modifica effettuata", "La password è stato aggiornata con successo.");
        },
        error: (any) => {
          this.toastService.show('errorToast', "Errore", "Impossibile aggiornare la password.");
        }
      });
    }

    // immagine
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
      email: this.agencyForm.value.email,
      citta: this.agencyForm.value.citta,
      azienda: true,
      aziendaPartitaIva: this.agencyForm.value.aziendaPartitaIva,
      aziendaIndirizzo: this.agencyForm.value.aziendaIndirizzo,
      aziendaRecapito: this.agencyForm.value.aziendaRecapito
    };
    this.userService.updateAgency(this.userId, body).subscribe({
      next: (data: any) => {
        this.user = data;
        this.toastService.show('successToast', "Modifica effettuata", "Il profilo è stato modificato con successo.");
      },
      error: (any) => {
        this.toastService.show('successToast', "Errore", "Non è stato possibile modificare il profilo. Prova a ricaricare la pagina.");
      }
    });

    // password
    if (this.agencyForm.value.nuovaPassword != "" &&
      this.agencyForm.value.ripetiNuovaPassword != "") {
      this.userService.updatePassword(this.userId, this.agencyForm.value.nuovaPassword || "").subscribe({
        next: (data: any) => {
          this.user = data;
          this.toastService.show('successToast', "Modifica effettuata", "La password è stato aggiornata con successo.");
        },
        error: (any) => {
          this.toastService.show('errorToast', "Errore", "Impossibile aggiornare la password.");
        }
      });
    }

    // immagine
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

  isLoaded(): boolean {
    return this.loaded;
  }
}
