import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DisplayServiceShortDTO } from '../model/display-service-short';
import { NavigationToolDTO, Ship, ShipDTO, ShipNavigationTool, ShipType } from '../model/ship';

@Injectable({
  providedIn: 'root'
})
export class ManagingShipsService {

  constructor(private http: HttpClient) { }

  getAllShips(): Observable<DisplayServiceShortDTO[]> {
    return this.http.get<DisplayServiceShortDTO[]>(`${environment.baseUrl}` + 'api/ships/all')
  }

  getShipsByName(input: string): Observable<DisplayServiceShortDTO[]> {
    return this.http.get<DisplayServiceShortDTO[]>(`${environment.baseUrl}` + 'api/ships/search/name/' + input);
  }

  getShipsByCity(input: string): Observable<DisplayServiceShortDTO[]> {
    return this.http.get<DisplayServiceShortDTO[]>(`${environment.baseUrl}` + 'api/ships/search/city/' + input);
  }

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

  createShip(ship: ShipDTO) {
    return this.http.post(`${environment.baseUrl}` + 'api/ships/createShip', ship, { observe: 'response', responseType: 'text' });
  }

  deleteShip(id: number) {
    return this.http.delete(`${environment.baseUrl}` + 'api/ships/deleteShip/' + id, { observe: 'response', responseType: 'text' });
  }

  getAllNavigationTools(id: number): Observable<ShipNavigationTool[]> {
    return this.http.get<ShipNavigationTool[]>(`${environment.baseUrl}` + 'api/ships/getNavigationTools', {
      params: {
        id: id
      }
    });
  }

  editTools(dto: NavigationToolDTO) {
    this.http.put(`${environment.baseUrl}` + 'api/ships/updateNavigationTools', dto).subscribe();
  }

  deleteTool(dto: NavigationToolDTO) {
    this.http.post(`${environment.baseUrl}` + 'api/ships/deleteTools', dto).subscribe();
  }

  addTool(dto: NavigationToolDTO) {
    this.http.post(`${environment.baseUrl}` + 'api/ships/addTools', dto).subscribe();
  }
}
