import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Adventure, createAdventureDTO } from '../model/adventure';

@Injectable({
  providedIn: 'root'
})
export class ManagingAdventuresService {

  constructor(private http: HttpClient) { }

  getAllAdventuresForInstructor(): Observable<Adventure[]> {
    return this.http.get<Adventure[]>(`${environment.baseUrl}` + 'api/adventures/getAdventuresForInstructor')
  }

  getAdventureByName(name: string): Observable<Adventure[]> {
    return this.http.get<Adventure[]>(`${environment.baseUrl}` + 'api/adventures/findAdventureByName', {
      params: {
        name: name,
      },
    });
  }

  getAdventureById(adventureId: number): Observable<Adventure> {
    return this.http.get<Adventure>(`${environment.baseUrl}` + 'api/adventures/getAdventureById', {
      params: {
        id: adventureId,
      },
    });
  }

  createAdventure(adventure: createAdventureDTO) {

    this.http.post(`${environment.baseUrl}` + 'api/adventures/createAdventure', adventure, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }).subscribe();
  }

  editAdventure(adventure : Adventure) {
    let percentage;
    if (adventure.percentageTakenFromCanceledReservations)
      percentage = adventure.percentageToTake
    else
      percentage = 0

    let adventureDTO = {
      id: adventure.id,
      name: adventure.name,
      pricePerDay: adventure.pricePerDay,
      description: adventure.description,
      termsOfUse: adventure.termsOfUse,
      additionalEquipment: adventure.additionalEquipment,
      capacity: adventure.capacity,
      percentageTakenFromCanceledReservations: adventure.percentageTakenFromCanceledReservations,
      percentageToTake: percentage,
      street: adventure.address.street,
      number: adventure.address.number,
      city: adventure.address.city,
      country: adventure.address.country,
      postcode: adventure.address.postcode

    }

    this.http.post(`${environment.baseUrl}` + 'api/adventures/updateAdventure', adventureDTO, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }).subscribe();
  }

  deleteAdventure(id: number) {
    this.http.delete(`${environment.baseUrl}` + 'api/adventures/deleteAdventure/' + id).subscribe();
  }
}