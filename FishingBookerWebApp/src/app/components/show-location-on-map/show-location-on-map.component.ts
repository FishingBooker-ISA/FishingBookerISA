import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { fromLonLat } from 'ol/proj'
import { Point } from 'ol/geom';
import Feature from 'ol/Feature'
import { Vector } from 'ol/layer'
import { Style } from 'ol/style'
import Icon from 'ol/style/Icon'
import VectorSource from 'ol/source/Vector';

@Component({
  selector: 'app-show-location-on-map',
  templateUrl: './show-location-on-map.component.html',
  styleUrls: ['./show-location-on-map.component.css']
})
export class ShowLocationOnMapComponent implements OnInit, AfterViewInit {

  map!: Map
  constructor(public dialogRef: MatDialogRef<ShowLocationOnMapComponent>, @Inject(MAT_DIALOG_DATA) public coords: LocationCoords) { }

  ngOnInit(): void {
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
        center: fromLonLat([this.coords.lon, this.coords.lat]),
        zoom: 14,
      }),
    });

    var markers = new Vector({
      source: new VectorSource(),
      style: new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: "../../../assets/img/marker.png",
        }),
      }),
    });

    this.map.addLayer(markers);

    var marker = new Feature(
      new Point(
        fromLonLat([
          this.coords.lon,
          this.coords.lat,
        ])
      )
    );
    markers.getSource().addFeature(marker);
  }

  onDismiss() {
    this.dialogRef.close();
  }

}

export class LocationCoords {
  constructor(
    public lon: number,
    public lat: number
  ) { }
}