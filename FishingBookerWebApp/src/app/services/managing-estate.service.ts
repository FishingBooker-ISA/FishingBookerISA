import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DisplayServiceShortDTO } from '../model/display-service-short';
import { Address, createEstateDTO, DisplayEstateShortDTO, Estate } from '../model/estate';

@Injectable({
  providedIn: 'root'
})
export class ManagingEstateService {

  constructor(private http: HttpClient) { }

  getAllEstatesForOwner(): Observable<Estate[]> {
    return this.http.get<Estate[]>(`${environment.baseUrl}` + 'api/estates/getEstatesForOwner')
  }
  
  getAllEstates(): Observable<DisplayServiceShortDTO[]> {
    return this.http.get<DisplayServiceShortDTO[]>(`${environment.baseUrl}` + 'api/estates/all')
  }

  getEstatesByName(input: string): Observable<DisplayServiceShortDTO[]> {
    return this.http.get<DisplayServiceShortDTO[]>(`${environment.baseUrl}` + 'api/estates/search/name/'+input);
  }

  getEstatesByCity(input:string): Observable<DisplayServiceShortDTO[]> {
    return this.http.get<DisplayServiceShortDTO[]>(`${environment.baseUrl}` + 'api/estates/search/city/'+input);
  }

  getEstateById(estateId: number): Observable<Estate> {
    return this.http.get<Estate>(`${environment.baseUrl}` + 'api/estates/getEstateById', {
      params: {
        id: estateId,
      },
    });
  }

  getEstateByName(name: string): Observable<Estate[]> {
    return this.http.get<Estate[]>(`${environment.baseUrl}` + 'api/estates/findEstateByName', {
      params: {
        name: name,
      },
    });
  }

  searchEstatesByName(name: string): Observable<Estate[]> {
    return this.http.get<Estate[]>(`${environment.baseUrl}` + 'api/estates/search/name/'+name);
  }

  editEstate(estate: Estate) {
    let percentage;
    if (estate.percentageTakenFromCanceledReservations)
      percentage = estate.percentageToTake
    else
      percentage = 0

    let estateDTO = {
      id: estate.id,
      name: estate.name,
      pricePerDay: estate.pricePerDay,
      description: estate.description,
      termsOfUse: estate.termsOfUse,
      additionalEquipment: estate.additionalEquipment,
      availableFrom: estate.availableFrom,
      availableTo: estate.availableTo,
      capacity: estate.capacity,
      percentageTakenFromCanceledReservations: estate.percentageTakenFromCanceledReservations,
      percentageToTake: percentage,
      numOfBeds: estate.numOfBeds,
      numOfRooms: estate.numOfRooms,
      street: estate.address.street,
      number: estate.address.number,
      city: estate.address.city,
      country: estate.address.country,
      postcode: estate.address.postcode

    }

    this.http.post(`${environment.baseUrl}` + 'api/estates/updateEstate', estateDTO, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }).subscribe();
  }

  createEstate(estate: createEstateDTO) {

    this.http.post(`${environment.baseUrl}` + 'api/estates/createEstate', estate, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }).subscribe();
  }

  getAllEstatesForClient(): DisplayEstateShortDTO[] {
    let date = new Date();
    let address: Address;
    address = {
      id: 0,
      street: "Ulica Nekog Nekog",
      number: 51,
      city: "Novi Sad",
      country: "Serbia",
      postcode: 21203
    }
    return [{
      id: 0,
      name: "Name 1",
      pricePerDay: 3550.00,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim ut labore et dolore magna aliqua.",
      availableFrom: date,
      availableTo: date,
      address: address,
      rating: 3.50,
    },
    {
      id: 1,
      name: "Name 2",
      pricePerDay: 4700.00,
      description: "Incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      availableFrom: date,
      availableTo: date,
      address: address,
      rating: 4.20,
    },
    {
      id: 2,
      name: "Name 3",
      pricePerDay: 4300.00,
      description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      availableFrom: date,
      availableTo: date,
      address: address,
      rating: 4.37,
    }];}

    deleteEstate(id: number) {
      this.http.delete(`${environment.baseUrl}` + 'api/estates/deleteEstate/' + id).subscribe();
    }
  }

