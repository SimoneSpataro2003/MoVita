import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { Utente } from '../../model/Utente';
import { CardFriendComponent } from '../../shared/common/card-friend/card-friend.component';

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
  users: Utente[] | undefined;
  loaded = false;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {

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
        this.loaded = true;
      }
    });
  }
}
