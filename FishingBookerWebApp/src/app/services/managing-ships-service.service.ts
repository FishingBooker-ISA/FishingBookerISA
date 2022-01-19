import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ship, ShipType } from '../model/ship';

@Injectable({
  providedIn: 'root'
})
export class ManagingShipsService {

  constructor(private http: HttpClient) { }

  getAllEstatesForOwner(): Observable<Ship[]> {
    return this.http.get<Ship[]>(`${environment.baseUrl}` + 'api/ships/getShipsForOwner')
  }

  getShipById(shipId: number): Observable<Ship> {
    return this.http.get<Ship>(`${environment.baseUrl}` + 'api/ships/getShipById', {
      params: {
        id: shipId,
      },
    });
  }

  getShipByName(name: string): Observable<Ship[]> {
    return this.http.get<Ship[]>(`${environment.baseUrl}` + 'api/ships/findShipByName', {
      params: {
        name: name,
      },
    });
  }

  editShip(ship: Ship) {
    let percentage;
    if (ship.percentageTakenFromCanceledReservations)
      percentage = ship.percentageToTake
    else
      percentage = 0

    let shipDTO = {
      id: ship.id,
      name: ship.name,
      pricePerDay: ship.pricePerDay,
      description: ship.description,
      termsOfUse: ship.termsOfUse,
      capacity: ship.capacity,
      percentageTakenFromCanceledReservations: ship.percentageTakenFromCanceledReservations,
      percentageToTake: percentage,
      street: ship.address.street,
      number: ship.address.number,
      city: ship.address.city,
      country: ship.address.country,
      postcode: ship.address.postcode,
      numOfEngines: ship.numOfEngines,
      powerOfEngines: ship.powerOfEngines,
      length: ship.length,
      maxSpeed: ship.maxSpeed,
      shipType: ship.shipType
    }

    return this.http.post(`${environment.baseUrl}` + 'api/ships/updateShip', shipDTO, { observe: 'response', responseType: 'text' });
  }

  createEstate(estate: Ship) {
    return this.http.post(`${environment.baseUrl}` + 'api/ships/createShip', estate, { observe: 'response', responseType: 'text' });
  }

  deleteShip(id: number) {
    return this.http.delete(`${environment.baseUrl}` + 'api/ships/deleteShip/' + id, { observe: 'response', responseType: 'text' });
  }
}
