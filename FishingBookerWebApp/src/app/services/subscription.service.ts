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

  subscribe(clientId:number, serviceId:number) {
    this.http.post(`${environment.baseUrl}` + 'api/subscriptions/new?userId=' + clientId +'&serviceId='+ serviceId, null ).subscribe(
      (response) => {
        console.log('response received');
      },
      (error) => {
        console.error('error caught in component');
      }
    );
  }

  unsubscribe(clientId:number, serviceId:number) {
    this.http.delete(`${environment.baseUrl}` + 'api/subscriptions/delete?userId=' + clientId +'&serviceId='+ serviceId).subscribe(
      (response) => {
        console.log('response received');
      },
      (error) => {
        console.error('error caught in component');
      }
    );
  }

  checkIfSubscribed(clientId:number, serviceId:number): Observable<boolean> {
    return this.http.get<boolean>(`${environment.baseUrl}` + 'api/subscriptions/exists?userId=' + clientId +'&serviceId='+ serviceId);
  }
}
