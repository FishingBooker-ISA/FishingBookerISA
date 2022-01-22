import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Adventure, createAdventureDTO } from '../model/adventure';
import { DisplayServiceShortDTO } from '../model/display-service-short';
import { ServiceAvailabilityParametersDTO } from '../model/service-availability-parametersDTO';

@Injectable({
  providedIn: 'root'
})
export class ManagingAdventuresService {

  constructor(private http: HttpClient) { }

  getAllAdventuresForInstructor(): Observable<Adventure[]> {
    return this.http.get<Adventure[]>(`${environment.baseUrl}` + 'api/adventures/getAdventuresForInstructor')
  }

  findAvailableAdventures(parameters: ServiceAvailabilityParametersDTO): Observable<DisplayServiceShortDTO[]> {
    return this.http.post<DisplayServiceShortDTO[]>(`${environment.baseUrl}` + 'api/adventures/available', parameters);
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
      capacity: adventure.capacity,
      percentageTakenFromCanceledReservations: adventure.percentageTakenFromCanceledReservations,
      percentageToTake: percentage,
      street: adventure.address.street,
      number: adventure.address.number,
      city: adventure.address.city,
      country: adventure.address.country,
      postcode: adventure.address.postcode

    }

    return this.http.post(`${environment.baseUrl}` + 'api/adventures/updateAdventure', adventureDTO, { observe: 'response', responseType: 'text' });

  }

  deleteAdventure(id: number) {
    return this.http.delete(`${environment.baseUrl}` + 'api/adventures/deleteAdventure/' + id, { observe: 'response', responseType: 'text' });

  }

  
  getAllAdventures(): Observable<DisplayServiceShortDTO[]> {
    return this.http.get<DisplayServiceShortDTO[]>(`${environment.baseUrl}` + 'api/adventures/all')
  }

  getAdventuresByName(input: string): Observable<DisplayServiceShortDTO[]> {
    return this.http.get<DisplayServiceShortDTO[]>(`${environment.baseUrl}` + 'api/adventures/search/name/'+input);
  }

  getAdventuresByCity(input:string): Observable<DisplayServiceShortDTO[]> {
    return this.http.get<DisplayServiceShortDTO[]>(`${environment.baseUrl}` + 'api/adventures/search/city/'+input);
  }
  
}
