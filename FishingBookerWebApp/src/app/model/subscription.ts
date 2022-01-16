import { Address, ServiceType } from "./estate"

export class SubscriptionDTO {
    id!: number
    serviceId!: number
    type!: string
    name!: string
    pricePerDay!: number
    description!: string
    capacity!: number
    address!: Address
    rating!: number
    reviewsNumber!: number
}