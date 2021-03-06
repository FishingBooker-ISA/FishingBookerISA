import { User } from "./user";

export class DeleteAccountRequest {
    id!: number;
    reason!: string;
    user!: User;
    requestedDate!: Date;
}

export class DeletionRequestDTO {
    reason!: string;
    userId!: number;
}
