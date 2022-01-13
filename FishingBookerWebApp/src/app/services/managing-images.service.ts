import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Image } from '../model/image';

@Injectable({
  providedIn: 'root'
})
export class ManagingImagesService {

  constructor(private http: HttpClient) { }

  addImage(id: number, imgBase64: any) {
    var strImage = imgBase64.replace(/^data:image\/[a-z]+;base64,/, "");
    let dto = {
      serviceId: id,
      base64: strImage
    }

    this.http.post(`${environment.baseUrl}` + 'api/images/addImages', dto).subscribe();
  }

  getImages(id: number): Observable<Image[]> {
    return this.http.get<Image[]>(`${environment.baseUrl}` + 'api/images/getImages', {
      params: {
        serviceId: id
      }
    })
  }

  deleteImages(ids: number[]) {
    this.http.post(`${environment.baseUrl}` + 'api/images/deleteImages', ids).subscribe();
  }
}
