import { Address, ServiceType } from "./estate"

export class DisplayServiceShortDTO {
    id!: number
    type!: ServiceType
    name!: string
    pricePerDay!: number
    description!: string
    capacity!: number
    address!: Address
    rating!: number
    reviewsNumber!: number
}