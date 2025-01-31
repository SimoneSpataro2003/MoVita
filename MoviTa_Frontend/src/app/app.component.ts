import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {GoogleMapsModule} from '@angular/google-maps';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GoogleMapsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MoviTa_Frontend';
}
