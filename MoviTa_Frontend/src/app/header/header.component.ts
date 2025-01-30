import { Component } from '@angular/core';
import {Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  styleUrl: './header.component.css',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(private router: Router) {}

    goToProfile(userId: number) {
    this.router.navigate(['/profile', userId]);
  }
}
