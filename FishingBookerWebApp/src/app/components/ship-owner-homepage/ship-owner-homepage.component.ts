import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ship, ShipType } from 'src/app/model/ship';
import { ManagingShipsService } from 'src/app/services/managing-ships-service.service';

@Component({
  selector: 'app-ship-owner-homepage',
  templateUrl: './ship-owner-homepage.component.html',
  styleUrls: ['./ship-owner-homepage.component.css']
})
export class ShipOwnerHomepageComponent implements OnInit {

  ownersShips!: Ship[];
  searchShips!: string;
  shipType = ShipType
  constructor(public managingShipService: ManagingShipsService, private router: Router) { }

  ngOnInit(): void {
    this.getEstatesForOwner()
  }

  getEstatesForOwner() {
    this.managingShipService.getAllEstatesForOwner().subscribe((data) => this.ownersShips = data)
  }

  openShip(shipId: number) {
    this.router.navigate(['/ship', shipId]);
  }

  searchShipsByName() {
    if (this.searchShips == '') {
      this.managingShipService
        .getAllEstatesForOwner()
        .toPromise()
        .then((res) => (this.ownersShips = res as Ship[]));
    } else {
      this.managingShipService
        .getShipByName(this.searchShips)
        .toPromise()
        .then((res) => (this.ownersShips = res as Ship[]));
    }
  }

}
