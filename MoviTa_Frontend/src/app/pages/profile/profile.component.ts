import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { Utente } from '../../model/Utente';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  standalone: true,
  styleUrls: ['./profile.component.css'],
  imports: [CommonModule] // Aggiungi CommonModule qui
})
export class ProfileComponent implements OnInit {
  userId!: number;
  user!: Utente;
  loaded: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = parseInt(params.get('id')!, 10);
      this.getUser();
    });
  }

  getUser() {
    this.userService.getUserById(this.userId).subscribe({
      next: (user) => {
        console.log(user); // Verifica la struttura della risposta
        this.user = user; // Questo potrebbe dare errore se i tipi non sono compatibili
      },
      error:(error) => {
        console.log(error);
      }
    });
  }
}
