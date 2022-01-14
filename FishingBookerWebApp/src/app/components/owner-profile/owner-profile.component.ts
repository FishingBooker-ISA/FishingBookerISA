import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/model/login-user';
import { PasswordChangeDto } from 'src/app/model/password-change-dto';
import { User } from 'src/app/model/user';
import { SignupOwnersService } from 'src/app/services/signup-owners.service';
import { ChangePasswordComponent, PasswordDialogModel } from '../change-password/change-password.component';

@Component({
  selector: 'app-owner-profile',
  templateUrl: './owner-profile.component.html',
  styleUrls: ['./owner-profile.component.css']
})
export class OwnerProfileComponent implements OnInit {

  currentUser!: User
  editingMode!: boolean

  constructor(public signupService: SignupOwnersService, public dialog: MatDialog, public router: Router,
    public auth: SignupOwnersService) { }

  ngOnInit(): void {
    this.signupService.getUser().subscribe((data) => this.currentUser = data);
    this.currentUser = this.signupService.currentUser;
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

}
