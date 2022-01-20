import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/model/login-user';
import { PasswordChangeDto } from 'src/app/model/password-change-dto';
import { User } from 'src/app/model/user';
import { SignupOwnersService } from 'src/app/services/signup-owners.service';
import { ProfileService } from 'src/app/services/profile.service';
import { ChangePasswordComponent, PasswordDialogModel } from '../change-password/change-password.component';
import { DeletionRequestDTO } from 'src/app/model/account-request';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocationCoords, ShowLocationOnMapComponent } from '../show-location-on-map/show-location-on-map.component';

@Component({
  selector: 'app-owner-profile',
  templateUrl: './owner-profile.component.html',
  styleUrls: ['./owner-profile.component.css']
})
export class OwnerProfileComponent implements OnInit {

  currentUser!: User
  editingMode!: boolean
  deleteReason!: string
  firstAssistant = "FirstAssistant"
  captain = "Captain"

  constructor(public profileService: ProfileService, public dialog: MatDialog, public router: Router,
    public auth: SignupOwnersService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.auth.getUser().subscribe((data) => this.currentUser = data);
    this.currentUser = this.auth.currentUser;
    this.editingMode = false;
  }

  editUser() {
    this.editingMode = true;
  }

  onChangePassword() {

    let dto: PasswordChangeDto = {
      oldPassword: this.currentUser.password,
      newPassword: ""
    }

    const dialogData = new PasswordDialogModel(new PasswordChangeDto());

    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      maxWidth: '630px',
      height: '320px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult != "") {
        let login: LoginUser = {
          username: this.currentUser.email,
          password: dialogResult
        }

        setTimeout(() => {
          this.router.navigate(['/profile']);
          this.auth.logIn(login).subscribe();
        }, 1000);
      }
    });
  }

  sendDeleteRequest() {
    let dto: DeletionRequestDTO = {
      requestedDate: new Date,
      reason: this.deleteReason,
      userId: this.currentUser.id
    }
    this.profileService.deleteAccount(dto)
      .subscribe(
        (data) => {
          this._snackBar.open('Request successfully submitted', 'Dissmiss', {
            duration: 3000
          });

          setTimeout(() => {
          }, 1000);
        },
        (error) => {
          this._snackBar.open('You have already sent a request!', 'Dissmiss', {
            duration: 3000
          });
        });;;
    this.deleteReason = "";
  }

  openMap() {
    const dialogData = new LocationCoords(
      this.currentUser.address.longitude, this.currentUser.address.latitude
    );

    const dialogRef = this.dialog.open(ShowLocationOnMapComponent, {
      maxWidth: '800px',
      width: '600px',
      height: '600px',
      data: dialogData,
    });
  }

}
