import {Component, Input, OnChanges, OnInit, QueryList, SimpleChanges, ViewChild, ViewChildren} from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { MapService } from '../../../services/map/map.service';
import { Evento } from '../../../model/Evento';
import { PuntoMappa } from '../../../model/PuntoMappa';
import { NgForOf } from '@angular/common';
import {forkJoin, map} from 'rxjs'; // Importa forkJoin

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    GoogleMap,
    MapMarker,
    MapInfoWindow,
    NgForOf
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit, OnChanges {
  @Input() eventi!: Evento[];
  @ViewChild(MapInfoWindow, { static: false }) infoWindow!: MapInfoWindow;
  @ViewChildren(MapMarker) markers!: QueryList<MapMarker>;
  center: google.maps.LatLngLiteral = {
    lat: 32.0000000,
    lng: 9.1200000
  };

  points: PuntoMappa[] = [];
  infoContent: string = "";
  zoom = 9;

  ngOnInit() {
    this.caricaCoordinateEventi();
    // La funzione computeCenter verrà chiamata al termine delle risposte del servizio
  }

  constructor(private mapService: MapService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['eventi'] && !changes['eventi'].firstChange) {
      this.points = [];
      console.log("Lista eventi cambiata, aggiornamento mappa...");
      this.caricaCoordinateEventi();
    }
  }


  openInfoWindow(windowIndex: number, content: string) {
    this.markers.forEach((marker: MapMarker, ix: number) => {
      if (windowIndex === ix) {
        this.infoContent = content;
        this.infoWindow.open(marker);
      }
    });
  }

    // Modificato per usare forkJoin e attendere tutte le risposte
  caricaCoordinateEventi() {
    // Crea un array di osservabili per tutte le richieste
    const coordinateRequests = this.eventi.map(evento =>
      this.mapService.getCoordinates(evento).pipe(
        // Mappa il risultato della risposta
        map((coordinate: any) => {
          const coord: google.maps.LatLngLiteral = {
            lat: coordinate.results[0].geometry.location.lat,
            lng: coordinate.results[0].geometry.location.lng,
          };
          this.points.push({ title: evento.nome, position: coord, info: this.createBody(evento) });
        })
      )
    );

    // Usa forkJoin per eseguire tutte le richieste in parallelo
    forkJoin(coordinateRequests).subscribe({
      next: () => {
        // Una volta completate tutte le richieste, calcola il centro
        this.computeCenter();
      },
      error: (err) => {
        console.error("Errore nel recupero delle coordinate:", err);
      }
    });
  }


  private createBody(evento: Evento): string {
    return `<article class="text-primary text-center">
              <h5>${evento.nome}</h5>
              <p>${evento.citta}, ${evento.indirizzo}</p>
            </article>`;
  }

  private computeCenter() {
    let totLat = 0;
    let totLng = 0;

    for (let point of this.points) {
      totLat += point.position.lat;
      totLng += point.position.lng;
    }
    this.center = {
      lat: parseFloat((totLat / this.points.length).toFixed(7)),
      lng: parseFloat((totLng / this.points.length).toFixed(7))
    };
  }
}
