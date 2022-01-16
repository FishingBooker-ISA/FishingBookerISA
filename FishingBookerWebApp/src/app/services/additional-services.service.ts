import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AdditionalServiceDTO } from '../model/additional-service';

@Injectable({
  providedIn: 'root'
})
export class AdditionalServicesService {

  constructor(public http: HttpClient) { }

  editAdditionalService(dto: AdditionalServiceDTO) {
    this.http.put(`${environment.baseUrl}` + 'api/additional/updateAdditionalEquipment', dto).subscribe();
  }

  deleteAdditional(dto: AdditionalServiceDTO) {
    this.http.post(`${environment.baseUrl}` + 'api/additional/deleteAdditionalEquipment', dto).subscribe();
  }

  addAdditional(dto: AdditionalServiceDTO) {
    this.http.post(`${environment.baseUrl}` + 'api/additional/addAdditionalEquipment', dto).subscribe();
  }
}
