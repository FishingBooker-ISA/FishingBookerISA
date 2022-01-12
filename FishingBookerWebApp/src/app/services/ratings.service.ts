import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Rating, RatingReviewDTO } from '../model/rating';

@Injectable({
  providedIn: 'root'
})
export class RatingsService {

  constructor(private http: HttpClient) { }

  getRatingsForService(id: number): Observable<Rating[]> {
    return this.http.get<Rating[]>(`${environment.baseUrl}` + 'api/ratings/getRatings', {
      params: {
        id: id,
      },
    });
  }

  public sendRatingReview(review : RatingReviewDTO){
    return this.http
      .post(
        `${environment.baseUrl}` + 'api/ratings/reviewRating',
       review
      )
      .subscribe((response) => {
        console.log('response received');
      },
      (error) => {
        console.error('error caught in component');
      });
  }
}
