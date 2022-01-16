import { Address, ServiceType } from "./estate"
import { User } from "./user"

export class BookingService {
    id!: number
    type!: ServiceType
    name!: string
    pricePerDay!: number
    description!: string
    termsOfUse!: string
    additionalEquipment!: string
    capacity!: number
    percentageTakenFromCanceledReservations!: boolean
    percentageToTake!: number
    address!: Address
    owner! : User
}
