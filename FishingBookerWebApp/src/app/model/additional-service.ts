export interface AdditionalService {
    id: number,
    name: string,
    price: number,
    bookingServiceId: number
}

export class AdditionalServiceDTO {
    id!: number;
    name!: string;
    price!: number;
    bookingServiceId!: number
}