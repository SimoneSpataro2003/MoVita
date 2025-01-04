import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {HeaderComponent} from '../../header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgOptimizedImage,
    HeaderComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
