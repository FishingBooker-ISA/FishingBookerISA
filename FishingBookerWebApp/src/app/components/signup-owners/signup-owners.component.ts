import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { RegistrationRequest } from 'src/app/model/registration-request';
import { SignupOwnersService } from 'src/app/services/signup-owners.service';

@Component({
  selector: 'app-signup-owners',
  templateUrl: './signup-owners.component.html',
  styleUrls: [
    './signup-owners.component.css',
    '../signup/signup.component.css',
  ],
})
export class SignupOwnersComponent implements OnInit {
  email!: string;
  password!: string;
  repeatPassword!: string;
  firstName!: string;
  lastName!: string;
  street!: string;
  number!: number;
  city!: string;
  country!: string;
  postcode = 0;
  reason!: string;
  selectedRole!: string;
  phoneNumber!: string;
  role!: string;

  checkEmail = new FormControl('', [Validators.required, Validators.email]);
  checkPassword = new FormControl('', [Validators.required]);
  fieldRequired = new FormControl('', [Validators.required]);
  errorMessage = '';

  constructor(public signupOwnerService: SignupOwnersService) { }

  ngOnInit(): void { }

  roles = ['Estate owner', 'Ship owner', 'Fishing instructor'];

  public signUp() {
    if (this.selectedRole == 'Estate owner') this.role = 'ROLE_ESTATE_OWNER';
    else if (this.selectedRole == 'Ship owner') this.role = 'ROLE_SHIP_OWNER';
    else if (this.selectedRole == 'Fishing instructor')
      this.role = 'ROLE_INSTRUCTOR';

    let registrationRequest: RegistrationRequest = {
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      street: this.street,
      number: this.number,
      city: this.city,
      country: this.country,
      postcode: this.postcode,
      reason: this.reason,
      role: this.role,
      phoneNumber: this.phoneNumber,
    };

    this.signupOwnerService.sendSignupRequest(registrationRequest);
    //this.errorMessage = this.getErrorMessage();
  }

  getErrorMessage() {
    if (
      this.fieldRequired.hasError('required') ||
      this.checkEmail.hasError('required') ||
      this.checkPassword.hasError('required')
    ) {
      return 'All fields must be filled!';
    }
    return '';
  }

  getEmailErrorMessage() {
    if (this.checkEmail.hasError('email')) {
      return 'Not a valid email!';
    }

    return '';
  }

  getPasswordErrorMessage() {
    if (!this.checkIfPasswordsMatch()) return "Passwords don't match!";

    return '';
  }

  isButtonDisabled() {
    if (
      this.checkIfPasswordsMatch() &&
      this.checkPassword.valid &&
      this.checkEmail.valid &&
      this.fieldRequired.valid
    )
      return false;

    return true;
  }

  checkIfFieldsWereTouched() {
    if (
      this.fieldRequired.dirty ||
      this.checkEmail.dirty ||
      this.checkPassword.dirty ||
      this.fieldRequired.touched ||
      this.checkPassword.touched ||
      this.checkEmail.touched
    )
      return true;

    return false;
  }

  checkIfFieldsAreInvalid() {
    if (
      this.fieldRequired.invalid ||
      this.checkEmail.invalid ||
      this.checkPassword.invalid
    )
      return true;

    return false;
  }

  checkIfPasswordsMatch() {
    if (this.password === this.repeatPassword) return true;

    return false;
  }
}
