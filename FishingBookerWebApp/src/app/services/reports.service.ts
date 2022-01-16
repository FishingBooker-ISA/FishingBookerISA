import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Report, ReportDTO, ReportReviewDTO } from '../model/report';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http: HttpClient) { }

  getReports(): Observable<Report[]> {
    return this.http.get<Report[]>(`${environment.baseUrl}` + 'api/reports/getReportsToConsider');
  }

  public sendReportReview(review : ReportReviewDTO){
    return this.http
      .post(
        `${environment.baseUrl}` + 'api/reports/reviewReport',
       review
      )
      .subscribe((response) => {
        console.log('response received');
      },
      (error) => {
        console.error('error caught in component');
      });
  }

  public createReport(review : ReportDTO){
    return this.http
      .post(
        `${environment.baseUrl}` + 'api/reservations/createReport',
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
