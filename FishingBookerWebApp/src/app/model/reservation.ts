import { BookingService } from "./booking-service"
import { User } from "./user"

export enum ShipOwnerRole {
    CAPTAIN,
    FIRST_ASSISTANT
}

export class Reservation {
    id!: number
    reservedDate!: Date
    reservationStart!: Date
    reservationEnd!: Date
    isPromo!: boolean
    isCanceled!: boolean
    additionalEquipment!: string
    price!: number
    shipOwnerRole!: ShipOwnerRole
    user!: User
    bookingService!: BookingService
}

export class ReservationDTO{
    reservedDate!: Date
    reservationStart!: Date
    reservationEnd!: Date
    isPromo!: boolean
    isCanceled!: boolean
    additionalEquipment!: string
    price!: number
    shipOwnerRole!: ShipOwnerRole
    userId!: number
    serviceId!: number
}
