import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PromoAction } from '../model/action';
import { AdditionalService } from '../model/additional-service';

@Injectable({
  providedIn: 'root'
})
export class PromoActionsService {

  constructor(public http: HttpClient) { }

  getAllActionsForService(id: number): Observable<PromoAction[]> {
    return this.http.get<PromoAction[]>(`${environment.baseUrl}` + 'api/promoActions/getAllActionsForService', {
      params: {
        id: id
      }
    })
  }

  addPromoAction(action: PromoAction) {
    return this.http.post(`${environment.baseUrl}` + 'api/promoActions/addPromoAction', action, { observe: 'response', responseType: 'text' });
  }

  getAllAdditionalServices(id: number): Observable<AdditionalService[]> {
    return this.http.get<AdditionalService[]>(`${environment.baseUrl}` + 'api/additional/getAdditionalForService', {
      params: {
        id: id
      }
    })
  }
}
