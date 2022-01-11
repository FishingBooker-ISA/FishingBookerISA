import { Address } from "./address";
import { Role } from "./registration-request";

export class User {
    id!: number;
    firstName!: string;
    lastName!: string;
    email!: string;
    phoneNumber!: string;
    role!: Role;
    address!: Address;
    password!: string
}
