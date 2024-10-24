import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { LocalicacionService } from 'src/app/servicios/localicacion.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent  implements OnInit {
  localizacionService = inject(LocalicacionService);
  
  @Output() locationSelected = new EventEmitter<{lat: number, lng: number}>();
  
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 18,
    minZoom: 8,
    mapTypeControl: false,
    streetViewControl: false
  };
  markerPosition!: google.maps.LatLngLiteral;
  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
  };
  zoom =  12
  center!: google.maps.LatLngLiteral;
  
  constructor() { 
    this.localizacionService.getCurrentLocation().then((location) => {
      const {latitude, longitude} = location;
      this.center = {
        lat: latitude,
        lng: longitude
      };
      this.markerPosition = {lat: latitude, lng: longitude};
      this.locationSelected.emit({ lat:latitude, lng: longitude });
    });
  }
  onMapClick(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      const latitude = event.latLng.lat();
      const longitude = event.latLng.lng();
      this.markerPosition = {lat: latitude, lng: longitude};
      this.locationSelected.emit({lat: latitude, lng: longitude});
    }
  }
  

  ngOnInit() {}

}
