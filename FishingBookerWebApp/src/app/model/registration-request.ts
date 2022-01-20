import { NumberValueAccessor } from "@angular/forms";

export interface Role {
  id: number,
  name: string
}

export class RegistrationRequest {
  email!: string;
  password!: string;
  firstName!: string;
  lastName!: string;
  street!: string;
  number!: number;
  city!: string;
  country!: string;
  postcode!: number;
  longitude!: number;
  latitude!: number;
  reason!: string;
  role!: string;
  phoneNumber!: string;
  shipOwnerRole!: number;
}
