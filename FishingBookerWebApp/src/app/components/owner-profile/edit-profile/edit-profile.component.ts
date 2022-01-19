import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PasswordChangeDto } from 'src/app/model/password-change-dto';
import { User } from 'src/app/model/user';
import { ProfileService } from 'src/app/services/profile.service';
import { ChangePasswordComponent, PasswordDialogModel } from '../../change-password/change-password.component';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css', '../owner-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  @Input()
  editingMode!: boolean;
  @Input()
  currentUser!: User;

  constructor(public profileService: ProfileService, public dialog: MatDialog, public router: Router) { }

  ngOnInit(): void {
  }

  hasErrors() {
    if (this.currentUser.firstName === "" || this.currentUser.firstName === null ||
      this.currentUser.lastName === "" || this.currentUser.lastName === null ||
      this.currentUser.address.city === "" || this.currentUser.address.street === "" ||
      this.currentUser.address.number === null || this.currentUser.address.country === "" ||
      this.currentUser.phoneNumber == "")
      return true;

    return false
  }

  cancelEditing() {
    this.editingMode = false;
    window.location.reload()
  }

  saveChanges() {
    console.log(this.currentUser.shipOwnerRole);

    this.profileService.editUserProfile(this.currentUser);
    window.location.reload()
  }
}
