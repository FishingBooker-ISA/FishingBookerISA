import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ClientRegistrationDTO } from 'src/app/model/client';
import { SignupOwnersService } from 'src/app/services/signup-owners.service'; 
//^^^^^^

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
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
  selectedRole!: string;
  phoneNumber!: string;

  checkEmail = new FormControl('', [Validators.required, Validators.email]);
  checkPassword = new FormControl('', [Validators.required]);
  fieldRequired = new FormControl('', [Validators.required]);
  errorMessage = '';

  constructor(public signupOwnerService: SignupOwnersService) { }

  ngOnInit(): void {
  }


  public signUp() {

    let client: ClientRegistrationDTO = {
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      street: this.street,
      number: this.number,
      city: this.city,
      country: this.country,
      postcode: this.postcode,
      phoneNumber: this.phoneNumber,
    };

    this.signupOwnerService.sendSignupClient(client);
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


