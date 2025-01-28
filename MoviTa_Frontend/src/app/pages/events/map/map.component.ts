import {afterNextRender, AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {GoogleMap} from '@angular/google-maps';
import {MapService} from '../../../services/map/map.service';
import {Evento} from '../../../model/Evento';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    GoogleMap
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit{

  @Input() eventi!: Evento[];

  constructor(private mapService: MapService) {}

  ngOnInit(): void {
    this.showCoordinates(this.eventi[0]);
  }

  display: any;
  center: google.maps.LatLngLiteral = {
    lat: 22.2736308,
    lng: 70.7512555
  };
  zoom = 6;


  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = (event.latLng.toJSON());
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }

  showCoordinates(evento: Evento){
    this.mapService.getCoordinates(evento).subscribe({
      next: (coordinate) =>{
        console.log(coordinate);
      },
      error: (err) =>{
        console.log(err);
      }
    })
  }
}

