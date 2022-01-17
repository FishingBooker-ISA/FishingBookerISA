import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReservationDTO } from '../model/reservation';
import { User } from '../model/user';

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

  public createReservation(dto : ReservationDTO){
    return this.http.post(`${environment.baseUrl}` + 'api/reservations/createReservation', dto, { observe: 'response', responseType: 'text' });
  }
}
