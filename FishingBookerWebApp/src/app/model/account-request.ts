import { User } from "./user";

export class AccountRequest {
    id!: number;
    reason!: string;
    user!: User;
}
