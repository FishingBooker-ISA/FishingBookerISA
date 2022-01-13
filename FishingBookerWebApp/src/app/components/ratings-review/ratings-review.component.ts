import { Component, OnInit } from '@angular/core';
import { Rating, RatingReviewDTO } from 'src/app/model/rating';
import { RatingsService } from 'src/app/services/ratings.service';

@Component({
  selector: 'app-ratings-review',
  templateUrl: './ratings-review.component.html',
  styleUrls: ['./ratings-review.component.css']
})
export class RatingsReviewComponent implements OnInit {
  ratings! : Rating[];
  review! : RatingReviewDTO;

  constructor(public service: RatingsService) { }

  ngOnInit(): void {
    this.service.getRatingsForService(1).subscribe( res => this.ratings = res);
  }

  approveRating(id : number){
    this.review = new RatingReviewDTO;
    this.review.ratingId = id;
    this.review.isApproved = true;
    this.service.sendRatingReview(this.review);
    window.location.reload();
  }

  rejectRating(id : number){
    this.review = new RatingReviewDTO;
    this.review.ratingId = id;
    this.review.isApproved = false;
    this.service.sendRatingReview(this.review);
    window.location.reload();
  }
}
