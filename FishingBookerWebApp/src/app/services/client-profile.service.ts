import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DeletionRequestDTO } from '../model/delete-account-request';

@Injectable({
  providedIn: 'root'
})
export class ClientProfileService {

  constructor(private http: HttpClient) { }

  deletionRequestExists(id: number): Observable<boolean> {
    return this.http.get<boolean>(`${environment.baseUrl}` + 'api/client/deletionRequestExists/' + id);
  }

  getClientPoints(id: number): Observable<number> {
    return this.http.get<number>(`${environment.baseUrl}` + 'api/client/points/' + id);
  }
  getClientPenalties(id: number): Observable<number> {
    return this.http.get<number>(`${environment.baseUrl}` + 'api/client/penalties/' + id);
  }

  sendDeletionRequest(request: DeletionRequestDTO) {
    this.http.post(`${environment.baseUrl}` + 'api/client/sendDeletionRequest', request)
    .subscribe(
      (response) => {
        console.log('response received');
      },
      (error) => {
        let err = 'Account with this email already exists!';
        console.error('error caught in component');
      }
    );
  }
}
