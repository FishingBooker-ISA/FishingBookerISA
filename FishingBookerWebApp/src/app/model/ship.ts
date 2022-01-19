import { AdditionalServiceDTO } from "./additional-service"
import { Address, ServiceType } from "./estate"
import { User } from "./user"

export enum ShipType {
    BOAT,
    YACHT,
    SMALL_SHIP,
}

export class Ship {
    id!: number
    type!: ServiceType
    name!: string
    pricePerDay!: number
    description!: string
    termsOfUse!: string
    capacity!: number
    percentageTakenFromCanceledReservations!: boolean
    percentageToTake!: number
    address!: Address
    numOfEngines!: number
    powerOfEngines!: number
    length!: number
    maxSpeed!: number
    shipType!: ShipType;
    navigationTools!: NavigationToolDTO[]
    additionalEquipmentList!: AdditionalServiceDTO[]
    owner!: User
}

export class ShipDTO {
    id!: number
    type!: ServiceType
    name!: string
    pricePerDay!: number
    description!: string
    termsOfUse!: string
    capacity!: number
    percentageTakenFromCanceledReservations!: boolean
    percentageToTake!: number
    street!: string
    number!: number
    city!: string
    country!: string
    postcode!: number
    numOfEngines!: number
    powerOfEngines!: number
    length!: number
    maxSpeed!: number
    shipType!: ShipType;
    navigationTools = [] as NavigationToolDTO[]
    additionalEquipmentList = [] as AdditionalServiceDTO[]
}

export class NavigationToolDTO {
    id!: number
    name!: string
    description!: string
    shipId!: number
}

export interface ShipNavigationTool {
    id: number
    name: string
    description: string
    shipId: number
}