import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NewAdminDTO } from 'src/app/model/user';
import { AdminRequestsService } from 'src/app/services/admin-requests.service';

@Component({
  selector: 'app-new-admin-form',
  templateUrl: './new-admin-form.component.html',
  styleUrls: ['./new-admin-form.component.css']
})
export class NewAdminFormComponent implements OnInit {
  email!: string;
  firstName!: string;
  lastName!: string;
  street!: string;
  number!: number;
  city!: string;
  country!: string;
  postcode = 0;
  phoneNumber!: string;

  checkEmail = new FormControl('', [Validators.required, Validators.email]);
  fieldRequired = new FormControl('', [Validators.required]);
  errorMessage = '';

  constructor(public service: AdminRequestsService) { }

  ngOnInit(): void {
  }

  getErrorMessage() {
    if (
      this.fieldRequired.hasError('required') ||
      this.checkEmail.hasError('required')
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

  isButtonDisabled() {
    if (
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
      this.fieldRequired.touched ||
      this.checkEmail.touched
    )
      return true;

    return false;
  }

  checkIfFieldsAreInvalid() {
    if (
      this.fieldRequired.invalid ||
      this.checkEmail.invalid
    )
      return true;

    return false;
  }

  addAdmin(){

    let newAdmin : NewAdminDTO= {
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      street: this.street,
      number: this.number,
      city: this.city,
      country: this.country,
      postcode: this.postcode,
      phoneNumber: this.phoneNumber
    }

    this.service.addNewAdmin(newAdmin);
    window.location.reload();
    
  }

}