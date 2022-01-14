import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Complaint, ComplaintReviewDTO } from '../model/complaint';

@Injectable({
  providedIn: 'root'
})
export class ComplaintsService {

  constructor(private http: HttpClient) { }

  public getAllComplaints() : Observable<Complaint[]> {
    return this.http.get<Complaint[]>(`${environment.baseUrl}` + 'api/complaints/getComplaints');
  }

  public sendComplaintReview(review : ComplaintReviewDTO){
    return this.http
      .post(
        `${environment.baseUrl}` + 'api/complaints/reviewComplaint',
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
