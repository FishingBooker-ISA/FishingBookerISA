import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReservationDisplayDTO } from '../model/reservation-display';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) { }

  getPastReservationsForClient(id:number): Observable<ReservationDisplayDTO[]> {
    return this.http.get<ReservationDisplayDTO[]>(`${environment.baseUrl}` + 'api/reservations/reservationHistory/'+id);
    
  }

  getUpcomingReservationsForClient(id:number): Observable<ReservationDisplayDTO[]> {
    return this.http.get<ReservationDisplayDTO[]>(`${environment.baseUrl}` + 'api/reservations/upcomingReservation/'+id);
  }
}
