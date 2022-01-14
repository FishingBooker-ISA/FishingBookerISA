import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/model/address';
import { User } from 'src/app/model/user';
import { SignupOwnersService } from 'src/app/services/signup-owners.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  backupUser: User = new User();
  currentUser: User = new User();
  isClient: boolean = false;
  isDisabled: boolean = true;
  isEditing: boolean = false;
  isChangingPassword: boolean = false;
  newPassword1: string = "";
  newPassword2: string = "";
  oldPassword: string = "";
  errorMessage: string = "";


  constructor(public signupService: SignupOwnersService) { }

  ngOnInit(): void {
    this.signupService.getUser().subscribe((data) => {
      this.currentUser = data;
      this.backupUser = new User();
      this.backupUser.firstName = this.currentUser.firstName;
      this.backupUser.lastName = this.currentUser.lastName;
      this.backupUser.address.street = this.currentUser.address.street;
      this.backupUser.address.number = this.currentUser.address.number;
      this.backupUser.address.city = this.currentUser.address.city;
      this.backupUser.address.country = this.currentUser.address.country;
      this.backupUser.phoneNumber = this.currentUser.phoneNumber;
      if (this.currentUser.role.name == "ROLE_CLIENT") {
        this.isClient = true;
      }

    });
    this.currentUser = this.signupService.currentUser;
  }

  editProfile() {
    if (this.currentUser.firstName != "" && this.currentUser.lastName != "" && this.currentUser.address.street != "" && this.currentUser.address.number < 1 && this.currentUser.address.city != "" && this.currentUser.address.country != "" && this.currentUser.phoneNumber != "") {

      this.isEditing = false;
      this.backupUser.firstName = this.currentUser.firstName;
      this.backupUser.lastName = this.currentUser.lastName;
      this.backupUser.address.street = this.currentUser.address.street;
      this.backupUser.address.number = this.currentUser.address.number;
      this.backupUser.address.city = this.currentUser.address.city;
      this.backupUser.address.country = this.currentUser.address.country;
      this.backupUser.phoneNumber = this.currentUser.phoneNumber;
      //poziv beka
    }
    this.errorMessage = "Please fill out all fields."
  }

  restore() {
    this.isEditing = false;
    this.currentUser.firstName = this.backupUser.firstName;
    this.currentUser.lastName = this.backupUser.lastName;
    this.currentUser.address.street = this.backupUser.address.street;
    this.currentUser.address.number = this.backupUser.address.number;
    this.currentUser.address.city = this.backupUser.address.city;
    this.currentUser.address.country = this.backupUser.address.country;
    this.currentUser.phoneNumber = this.backupUser.phoneNumber;
    this.errorMessage = "";
  }

  changePassword() {
    if (!(this.newPassword1 && this.newPassword2 && this.oldPassword)) {
      this.errorMessage = "Please fill out all fields.";
      return;
    }
    if (!(this.newPassword1 == this.newPassword2)) {
      this.errorMessage = "New password doesn't match.";
      return;
    }
    // poziv beku, ako vrati gresku this.errorMessage = "Old password is incorrect.", ako sve prodje kako treba this.errorMessage = "";

    this.isChangingPassword = false;
  }

}
