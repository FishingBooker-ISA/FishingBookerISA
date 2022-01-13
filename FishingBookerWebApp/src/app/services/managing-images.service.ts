import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManagingImagesService {

  constructor(private http: HttpClient) { }

  addImage(id: number, imgBase64: any) {
    let dto = {
      serviceId: id,
      base64: imgBase64.substring(22, imgBase64.length)
    }

    this.http.post(`${environment.baseUrl}` + 'api/images/addImages', dto).subscribe();
  }

  getImages(id: number): Observable<string[]> {
    return this.http.get<string[]>(`${environment.baseUrl}` + 'api/images/getImages', {
      params: {
        serviceId: id
      }
    })
  }
}
