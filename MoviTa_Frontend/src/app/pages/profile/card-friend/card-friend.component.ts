import {Component, Input, OnInit} from '@angular/core';
import {Loadable} from '../../../model/Loadable';
import {Utente} from '../../../model/Utente';
import {UserService} from '../../../services/user/user.service';

@Component({
  selector: 'app-card-friend',
  standalone: true,
  imports: [],
  templateUrl: './card-friend.component.html',
  styleUrl: './card-friend.component.css'
})
export class CardFriendComponent implements OnInit, Loadable {
  @Input() utenteAmico!: Utente;
  numeroFollowers?: number;
  loaded: boolean = false;

  constructor(private userService: UserService) {
  }

  isLoaded(): boolean {
    return this.loaded;
  }

  ngOnInit(): void {
    this.showNumberFollowers();
  }

  showNumberFollowers(): void {
    this.userService.getNumberFollowers(this.utenteAmico.id).subscribe({
      next: result => {
        this.numeroFollowers = result; // Assume 'result' is the number of followers
        this.loaded = true;
      },
      error: () => {
        this.loaded = false; // Handle error if needed
      }
    });
  }
}
