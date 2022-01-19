import { AdditionalServiceDTO } from "./additional-service"
import { Address, ServiceType } from "./estate"

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
    navigationTools!: ShipNavigationTool[]
    additionalEquipmentList!: AdditionalServiceDTO[]
}

export interface ShipNavigationTool {
    id: number
    name: string
    description: string
    shipId: number
}
