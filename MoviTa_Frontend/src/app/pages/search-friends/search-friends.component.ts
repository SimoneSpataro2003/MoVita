import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { Utente } from '../../model/Utente';
import { CardFriendComponent } from '../../shared/common/card-friend/card-friend.component';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-search-friends',
  templateUrl: './search-friends.component.html',
  standalone: true,
  imports: [
    CardFriendComponent
  ],
  styleUrls: ['./search-friends.component.css']
})
export class SearchFriendsComponent implements OnInit {
  filter: string = "";
  users: Utente[] = [];
  loaded = false;
  private currentUserId: number | undefined;

  constructor(
    private userService: UserService,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    let utente: Utente = JSON.parse(this.cookieService.get('utente'));
    this.currentUserId = utente.id;
  }

  isLoaded(): boolean {
    return this.loaded;
  }

  updateValue(event: Event): void {
    this.filter = (event.target as HTMLInputElement).value;
    console.log(this.filter);
  }

  showUsersWithFilter(): void {
    this.userService.findUsersWithFilter(this.filter).subscribe({
      next: (users: Utente[]) => {
        this.users = users;
        console.log(this.filter);
        console.log(this.users);
        let idToDelete = this.currentUserId;
        this.users = this.users.filter(user=>user.id !=idToDelete );

        this.loaded = true;
      }
    });
  }
}
