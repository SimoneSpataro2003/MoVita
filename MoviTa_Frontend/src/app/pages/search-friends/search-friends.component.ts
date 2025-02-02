import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { Utente } from '../../model/Utente';
import { CardFriendComponent } from '../profile/card-friend/card-friend.component';

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
  trackByUserId: any;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.filter = (params.get("filter")!);
      this.showUsersWithFilter();
    });
  }

  isLoaded(): boolean {
    return this.loaded;
  }

  updateValue(event: Event): void {
    this.filter = (event.target as HTMLInputElement).value;
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
