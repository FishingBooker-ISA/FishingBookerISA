import { Component, OnInit } from '@angular/core';
import {Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { NewRatingDTO } from 'src/app/model/rating';
import { RatingsService } from 'src/app/services/ratings.service';


export interface DialogData {
  serviceId: number;
  clientId: number;
}

@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.css']
})
export class CreateReviewComponent implements OnInit {

  constructor(public ratingService: RatingsService, public dialogRef: MatDialogRef<CreateReviewComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData,) { }

  rating: string = "5";
  reviewText: string ="";
  review: NewRatingDTO = new NewRatingDTO();

  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSend(){
    this.review.clientId = this.data.clientId;
    this.review.serviceId = this.data.serviceId;
    this.review.givenMark = +this.rating;
    this.review.description = this.reviewText;
    this.ratingService.sendNewRating(this.review);
    
    this.dialogRef.close(true);
  }

}
