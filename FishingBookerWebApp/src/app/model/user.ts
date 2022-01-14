import { Address } from "./estate";
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

    constructor(){
        this.address = new Address();
        this.address.street = "";
        this.address.number = 0;
        this.address.city = "";
        this.address.country = "";
        this.address.id = 0;
        this.address.postcode = 0;

        
        this.firstName = "";
        this.lastName = "";
        this.phoneNumber = "";
        
        this.id = 0;
        this.email = "";
        this.password = "";
        this.role = {id:0, name:""};
    }
}

export class NewAdminDTO {
    email!: string;
    firstName!: string;
    lastName!: string;
    phoneNumber!: string;
    street!: string;
    number!: number;
    city!: string;
    country!: string;
    postcode!: number;
}
