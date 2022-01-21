export class LoyaltyProgram {
    id! : number
    pointsForBronze! : number
    percentForBronze! : number
    pointsForSilver! : number
    percentForSilver! : number
    pointsForGold! : number
    percentForGold! : number
    pointsForUser! : number
    pointsForOwner! : number
    percentageForApp! : number
}

export class TimePeriodDTO {
    startDate! : Date
    endDate! : Date
}
