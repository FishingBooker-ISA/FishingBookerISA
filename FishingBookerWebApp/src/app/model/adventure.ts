import { Address, ServiceType } from "./estate"

export class Adventure {
    id!: number
    type!: ServiceType
    name!: string
    pricePerDay!: number
    description!: string
    termsOfUse!: string
    additionalEquipment!: string
    availableFrom!: Date
    availableTo!: Date
    capacity!: number
    percentageTakenFromCanceledReservations!: boolean
    percentageToTake!: number
    address!: Address
    instructorBio! : string
}

export class createAdventureDTO {
    id!: number
    name!: string
    pricePerDay!: number
    description!: string
    termsOfUse!: string
    additionalEquipment!: string
    capacity!: number
    percentageTakenFromCanceledReservations!: boolean
    percentageToTake!: number
    instructorBio! : string
    street!: string
    number!: number
    city!: string
    country!: string
    postcode!: number
}