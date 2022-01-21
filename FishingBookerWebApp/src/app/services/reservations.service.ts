import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClientReservationDTO, ReservationDTO } from '../model/reservation';
import { User } from '../model/user';
import { Reservation } from '../model/reservation';
import { UnavailablePeriod, UnavailablePeriodDTO } from '../model/unavailable-period';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  

  constructor(private http: HttpClient) { }

  getClientForReservation(serviceId: number): Observable<User> {
    return this.http.get<User>(`${environment.baseUrl}` + 'api/reservations/getClientForReservation', {
      params: {
        serviceId: serviceId,
      },
    });
  }

  public createReservation(dto: ReservationDTO) {
    return this.http.post(`${environment.baseUrl}` + 'api/reservations/createReservation', dto, { observe: 'response', responseType: 'text' });
  }
  createClientReservation(dto: ClientReservationDTO) {
    return this.http.post(`${environment.baseUrl}` + 'api/reservations/createClientReservation', dto, { observe: 'response', responseType: 'text' });
  }

  getAllReservationsForService(id: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${environment.baseUrl}` + 'api/reservations/getReservationHistory', {
      params: {
        id: id
      }
    })
  }

  getAllUnavailablePeriods(id: number): Observable<UnavailablePeriod[]> {
    return this.http.get<UnavailablePeriod[]>(`${environment.baseUrl}` + 'api/unavailable/getAllUnavailablePeriods', {
      params: {
        id: id
      }
    })
  }

  addUnavailablePeriod(dto: UnavailablePeriodDTO) {
    return this.http.post(`${environment.baseUrl}` + 'api/unavailable/addUnavailablePeriod', dto, { observe: 'response', responseType: 'text' });
  }
}
