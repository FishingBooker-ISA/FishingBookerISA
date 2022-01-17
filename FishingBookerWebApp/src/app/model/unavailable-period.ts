export interface UnavailablePeriod {
    startDate: Date,
    endDate: Date
}

export class UnavailablePeriodDTO {
    start!: Date
    end!: Date
    serviceId!: number
}
