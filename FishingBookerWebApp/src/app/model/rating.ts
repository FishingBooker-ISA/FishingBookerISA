import { BookingService } from "./booking-service"
import { User } from "./user"

export class Rating {
    id! : number
    givenMark! : number
    description! : string
    isReviewed! : boolean
    isApproved! : boolean
    user! : User
    bookingService! : BookingService
}

export class RatingReviewDTO{
    ratingId! : number
    isApproved! : boolean
}