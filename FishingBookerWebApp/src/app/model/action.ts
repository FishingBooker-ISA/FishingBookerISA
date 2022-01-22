import { AdditionalService } from "./additional-service"

export class PromoAction {
    id!: number;
    pricePerDay!: number
    durationInDays!: number
    capacity!: number
    isTaken!: boolean
    additional!: string
    startDate!: Date
    endDate!: Date
    bookingServiceId!: number
    additionalServices!: AdditionalService[]
}

export class ActionReservationDTO {
    actionId!: number;
    clientId!: number;
}