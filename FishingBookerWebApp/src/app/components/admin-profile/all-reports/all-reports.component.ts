import { Component, OnInit } from '@angular/core';
import { Report, ReportReviewDTO } from 'src/app/model/report';
import { ReportsService } from 'src/app/services/reports.service';

@Component({
  selector: 'app-all-reports',
  templateUrl: './all-reports.component.html',
  styleUrls: ['./all-reports.component.css']
})
export class AllReportsComponent implements OnInit {
  allReports! : Report[];
  
  constructor(public service: ReportsService) { }

  ngOnInit(): void {
    this.service.getReports().subscribe( res => this.allReports = res);
  }

  sendComplaintReview(id : number, decision : boolean)
  {
    let review = new ReportReviewDTO();
    review = {
      id: id,
      isSanctioned : decision
    }
    this.service.sendReportReview(review);
    window.location.reload();
  }

}
