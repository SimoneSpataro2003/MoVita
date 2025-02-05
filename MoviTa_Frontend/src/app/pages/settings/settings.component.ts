import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth/auth.service';
import {CookieService} from 'ngx-cookie-service';
import {UserService} from '../../services/user/user.service';
import {Utente} from '../../model/Utente';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit {
  user: any;
  userId: number | null = null;
  loaded: boolean = false;

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit() {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe(
        (data) => {
          this.user = data;
          this.loaded = true;
        },
        (error) => {
          //TODO: errore nel caricamento del profilo
        }
      );
    } else {
      //TODO: errore ID utente non valido
    }
  }

  saveChanges() {
    if (this.user) {
      this.userService.updateUser(this.userId, this.user).subscribe(
        () => alert('Impostazioni aggiornate con successo!'),
        () => alert('Errore durante l’aggiornamento.')
      );
    }
  }
}
