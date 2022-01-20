import { AfterViewInit, Component, OnInit } from '@angular/core';
import { defaults as defaultControls } from 'ol/control';
import Select, { SelectEvent } from 'ol/interaction/Select';

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import OSM from 'ol/source/OSM';
import ZoomToExtent from 'ol/control/ZoomToExtent';
import { MatDialogRef } from '@angular/material/dialog';
import { fromLonLat, toLonLat } from 'ol/proj'
import { fromEventPattern } from 'rxjs';
import { Address } from 'src/app/model/estate';

@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.css']
})
export class MapModalComponent implements AfterViewInit {

  map!: Map
  selectSingleClick = new Select();
  constructor(public dialogRef: MatDialogRef<MapModalComponent>) { }

  chosenAddress!: Address
  ngOnInit(): void {
    this.chosenAddress = new Address()
  }

  reverseGeocode(coords: any) {
    fetch('http://nominatim.openstreetmap.org/reverse?format=json&lon=' + coords[0] + '&lat=' + coords[1])
      .then((response) => {
        return response.json();
      }).then((json) => {
        console.log(json);

        this.chosenAddress.street = json.address.road;
        this.chosenAddress.city = json.address.city;
        this.chosenAddress.number =
          json.address.house_number;
        this.chosenAddress.postcode =
          json.address.postcode;
        this.chosenAddress.country =
          json.address.country;
        this.chosenAddress.latitude = json.lat;
        this.chosenAddress.longitude = json.lon;
      });
  }

  mapClick(event: any) {
    var coordinate = this.map.getEventCoordinate(event);
    console.log("KOORD: " + coordinate);

    var conv = toLonLat(coordinate);
    console.log(conv);
    this.reverseGeocode(conv);
  }

  saveAddress() {
    this.dialogRef.close(this.chosenAddress);
  }

  ngAfterViewInit() {
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([20.9224158, 44.2107675]),
        zoom: 5,
      }),
    });
  }
}

