import { Component, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { MapService } from '../services/map.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
  value = '';
  results: google.maps.places.PlaceResult[];
  constructor(private mapService: MapService) {}

  search() {
    this.mapService
      .geocode({ address: this.value })
      .then(result => {
        this.map.center = result.geometry.location;
        this.nearbySearch(result.geometry.location);
      })
      .catch(() => {
        console.log('geocode 失敗');
      });
  }

  private nearbySearch(latLng: google.maps.LatLng): void {
    const placeService = new google.maps.places.PlacesService(
      this.map.data.getMap()
    );
    const request: google.maps.places.PlaceSearchRequest = {
      location: latLng,
      radius: 50000,
      keyword: `${this.value} コーヒー`
    };
    this.mapService
      .nearbySearch(placeService, request)
      .then(results => {
        this.results = results;
      })
      .catch(() => {
        console.log('nearbySearch 失敗');
      });
  }
}
