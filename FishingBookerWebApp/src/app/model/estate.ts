export enum ServiceType {
    Estate,
    Ship,
    Adventure,
}

export class Address {
    id!: number
    street!: string
    number!: number
    city!: string
    country!: string
    postcode!: number
}

export class Estate {
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
    numOfBeds!: number
    numOfRooms!: number
    address!: Address
}

export class createEstateDTO {
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
    numOfBeds!: number
    numOfRooms!: number
    street!: string
    number!: number
    city!: string
    country!: string
    postcode!: number

}

export class DisplayEstateShortDTO {
    id!: number
    name!: string
    pricePerDay!: number
    description!: string
    availableFrom!: Date
    availableTo!: Date
    address!: Address
    rating!: number
}