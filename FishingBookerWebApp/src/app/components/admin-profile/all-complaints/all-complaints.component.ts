import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  constructor(public service : ComplaintsService, private _snackBar: MatSnackBar) {
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
    this.service.sendComplaintReview(review).subscribe(
      (data) => {
        this.service.getAllComplaints().subscribe( res => this.allComplaints = res);
        this._snackBar.open('Review submitted', 'Dissmiss', {
          duration: 3000
        });


        setTimeout(() => {
        }, 1000);
      },
      (error) => {
        this._snackBar.open('This complaint has already been reviewed', 'Dissmiss', {
          duration: 3000
        });
      });;;
  }

}
