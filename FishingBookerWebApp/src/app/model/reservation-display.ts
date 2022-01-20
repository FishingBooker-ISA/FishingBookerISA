export class ReservationDisplayDTO {
    id!: number
    serviceId!: number
    serviceType!: string
    serviceName!: string
    totalPrice!: number
    additionalServices!: string
    capacity!: number
    startDate!: Date
    endDate!: Date
    durationInHours!: number
    canceled!: boolean
}