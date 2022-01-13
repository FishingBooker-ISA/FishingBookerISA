import { Component, OnInit } from '@angular/core';
import { Complaint, ComplaintReviewDTO } from 'src/app/model/complaint';
import { ComplaintsService } from 'src/app/services/complaints.service';

@Component({
  selector: 'app-all-complaints',
  templateUrl: './all-complaints.component.html',
  styleUrls: ['./all-complaints.component.css']
})
export class AllComplaintsComponent implements OnInit {
  allComplaints! : Complaint[];
  selectedComplaint! : Complaint;
  responseForClient! : string;
  responseForOwner! : string;

  constructor(public service : ComplaintsService) {
    this.service.getAllComplaints().subscribe( res => this.allComplaints = res);
   }

  ngOnInit(): void {
  }

  sendComplaintReview()
  {
    let review = new ComplaintReviewDTO();
    review = {
      id: this.selectedComplaint.id,
      responseForClient: this.responseForClient,
      responseForOwner: this.responseForOwner
    }
    this.service.sendComplaintReview(review);
    window.location.reload();
  }

}
