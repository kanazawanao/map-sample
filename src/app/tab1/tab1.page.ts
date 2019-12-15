import { Component, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { MapService } from '../services/map.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
  value = '';
  constructor(private mapService: MapService) {}

  geocode() {
    this.mapService
      .geocode({ address: this.value })
      .then(result => {
        this.map.center = result.geometry.location;
      })
      .catch(() => {
        console.log('geocode 失敗');
      });
  }
}
