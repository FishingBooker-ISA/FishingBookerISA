import { Reservation } from "./reservation"

export class Report {
    id!: number
    text!: string
    createdOn!: Date
    clientDidntShowUp!: boolean
    sanctionClient!: boolean
    isReviewed!:boolean
    reservation!: Reservation
}

export class ReportReviewDTO{
    id!: number
    isSanctioned!: boolean
}
