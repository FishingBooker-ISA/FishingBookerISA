import { User } from "./user";

export class AccountRequest {
    id!: number;
    reason!: string;
    user!: User;
}

export class DeletionRequestDTO {
    requestedDate!: Date;
    reason!: string;
    userId!: number;
}
