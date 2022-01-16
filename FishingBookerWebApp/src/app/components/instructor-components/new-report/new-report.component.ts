import { Component, OnInit } from '@angular/core';
import { ReportDTO } from 'src/app/model/report';
import { ReportsService } from 'src/app/services/reports.service';

@Component({
  selector: 'app-new-report',
  templateUrl: './new-report.component.html',
  styleUrls: ['./new-report.component.css']
})
export class NewReportComponent implements OnInit {
  text!:string;
  sanctionClient!:boolean;
  clientDidntShowUp!:boolean
  report!: ReportDTO;

  constructor(public service: ReportsService) { }

  ngOnInit(): void {
    this.sanctionClient = false;
    this.text='';
    this.clientDidntShowUp = true;
  }

  cancel(){
    this.text = '';
    this.sanctionClient = false;
    this.clientDidntShowUp = false;
  }
  submit(){
    this.report.reportText = this.text;
    this.report.clientDidntShowUp = this.clientDidntShowUp;
    this.report.createdOn = new Date;
    this.report.sanctionClient = this.sanctionClient;
    this.report.reservationId = 1;
    this.service.createReport(this.report);
  }

  isSubmitDisabled(){
    if(this.clientDidntShowUp)
      return false;
    else if(this.text === '')
      return true;
    else
      return false;
  }
}
