import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoyaltyProgram } from '../model/loyalty-program';

@Injectable({
  providedIn: 'root'
})
export class LoyaltyProgramService {

  constructor(private http: HttpClient) { }

  public getLoyaltyProgram() : Observable<LoyaltyProgram> {
    return this.http.get<LoyaltyProgram>(`${environment.baseUrl}` + 'api/loyalty/getLoyaltyProgram');
  }

  updateLoyaltyProgram(program: LoyaltyProgram) {

    this.http.post(`${environment.baseUrl}` + 'api/loyalty/updateLoyaltyProgram', program, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }).subscribe();
  }
}
