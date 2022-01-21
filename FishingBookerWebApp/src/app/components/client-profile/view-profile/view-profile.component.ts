import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Address } from 'src/app/model/address';
import { DeletionRequestDTO } from 'src/app/model/delete-account-request';
import { LoginUser } from 'src/app/model/login-user';
import { PasswordChangeDto } from 'src/app/model/password-change-dto';
import { User } from 'src/app/model/user';
import { ClientProfileService } from 'src/app/services/client-profile.service';
import { ProfileService } from 'src/app/services/profile.service';
import { SignupOwnersService } from 'src/app/services/signup-owners.service';
import { DeletionRequestComponent } from '../../deletion-request/deletion-request.component';

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
  isDeletionRequestSent = false;
  request!: DeletionRequestDTO;
  reason: string = "";
  rank = 1;
  numberOfPoints = 160;
  numberOfPenalties = 1;

  constructor(public profileService: ProfileService , public signupService: SignupOwnersService, private clientProfileService: ClientProfileService, public dialog: MatDialog) { }

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
      this.clientProfileService.deletionRequestExists(this.currentUser.id).subscribe((res) => { 
        this.isDeletionRequestSent = res;
      })

    });
    //this.currentUser = this.signupService.currentUser;
  }

  editProfile() {
    if (this.currentUser.firstName != "" && this.currentUser.lastName != "" && this.currentUser.address.street != "" && this.currentUser.address.number > 1 && this.currentUser.address.city != "" && this.currentUser.address.country != "" && this.currentUser.phoneNumber != "") {

      //poziv beka
      this.profileService.editUserProfile(this.currentUser);
      this.isEditing = false;
      this.backupUser.firstName = this.currentUser.firstName;
      this.backupUser.lastName = this.currentUser.lastName;
      this.backupUser.address.street = this.currentUser.address.street;
      this.backupUser.address.number = this.currentUser.address.number;
      this.backupUser.address.city = this.currentUser.address.city;
      this.backupUser.address.country = this.currentUser.address.country;
      this.backupUser.phoneNumber = this.currentUser.phoneNumber;
    }
    else
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
    this.errorMessage = "";
    let dto: PasswordChangeDto = {
      oldPassword: this.oldPassword,
      newPassword: this.newPassword1
    }
    this.profileService.changePassword(dto);
    this.isChangingPassword = false;
    let login: LoginUser = {
      username: this.currentUser.email, 
      password: this.newPassword1
    }

    setTimeout(() => {
      this.signupService.logIn(login).subscribe()
    }, 1000)

    this.oldPassword = "";
    this.newPassword1 = "";
    this.newPassword2 = "";
  }

  openDeleteDialog(): void{
    const dialogRef = this.dialog.open(DeletionRequestComponent, {
      width: '450px',
      data: { reason: this.reason},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.reason = result;
      if (this.reason){
        this.sendDeletionRequest();
      }
    });
  }

  sendDeletionRequest(){
    this.isDeletionRequestSent = true;
    this.request = {reason: this.reason, userId: this.currentUser.id};
    this.clientProfileService.sendDeletionRequest(this.request);
  }

}
