import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SubscriptionDTO } from '../model/subscription';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private http: HttpClient) { }

  getAllSubscriptionsForClient(id:number): Observable<SubscriptionDTO[]> {
    return this.http.get<SubscriptionDTO[]>(`${environment.baseUrl}` + 'api/subscriptions/'+id);
  }
}
