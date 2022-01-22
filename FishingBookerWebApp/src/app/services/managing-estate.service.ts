import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DisplayServiceShortDTO } from '../model/display-service-short';
import { Address, createEstateDTO, DisplayEstateShortDTO, Estate } from '../model/estate';
import { ServiceAvailabilityParametersDTO } from '../model/service-availability-parametersDTO';

@Injectable({
  providedIn: 'root'
})
export class ManagingEstateService {
  

  constructor(private http: HttpClient) { }

  getAllEstatesForOwner(): Observable<Estate[]> {
    return this.http.get<Estate[]>(`${environment.baseUrl}` + 'api/estates/getEstatesForOwner')
  }
  
  findAvailableEstates(parameters: ServiceAvailabilityParametersDTO): Observable<DisplayServiceShortDTO[]> {
    return this.http.post<DisplayServiceShortDTO[]>(`${environment.baseUrl}` + 'api/estates/available', parameters);
  }

  getAllEstates(): Observable<DisplayServiceShortDTO[]> {
    return this.http.get<DisplayServiceShortDTO[]>(`${environment.baseUrl}` + 'api/estates/all')
  }

  getEstatesByName(input: string): Observable<DisplayServiceShortDTO[]> {
    return this.http.get<DisplayServiceShortDTO[]>(`${environment.baseUrl}` + 'api/estates/search/name/' + input);
  }

  getEstatesByCity(input: string): Observable<DisplayServiceShortDTO[]> {
    return this.http.get<DisplayServiceShortDTO[]>(`${environment.baseUrl}` + 'api/estates/search/city/' + input);
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
    return this.http.get<Estate[]>(`${environment.baseUrl}` + 'api/estates/search/name/' + name);
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

    return this.http.post(`${environment.baseUrl}` + 'api/estates/updateEstate', estateDTO, { observe: 'response', responseType: 'text' });
  }

  createEstate(estate: createEstateDTO) {
    return this.http.post(`${environment.baseUrl}` + 'api/estates/createEstate', estate, { observe: 'response', responseType: 'text' });
  }

  deleteEstate(id: number) {
    return this.http.delete(`${environment.baseUrl}` + 'api/estates/deleteEstate/' + id, { observe: 'response', responseType: 'text' });
  }

  getAverageRating(id: number) {
    return this.http.get(`${environment.baseUrl}` + 'api/ratings/getAvgRating', {
      params: {
        serviceId: id
      }
    })
  }
}

