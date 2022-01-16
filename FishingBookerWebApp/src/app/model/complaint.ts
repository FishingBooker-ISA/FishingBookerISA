import { User } from "./user"

export class Complaint {
    id! : number
    reason! : string
    createdDate! : Date
    isReviewed! : boolean
    responseForClient! : string
    responseForOwner! : string
    isComplaintOnOwner! : boolean
    client! : User
    owner! : User
}

export class ComplaintReviewDTO {
    id! : number
    responseForClient! : string
    responseForOwner! : string
}

export class NewComplaintDTO {
    reason! : string
    isComplaintOnOwner! : boolean
    clientId! : number
    serviceId! : number
}

