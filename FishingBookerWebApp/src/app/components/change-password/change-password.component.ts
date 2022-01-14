import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PasswordChangeDto } from 'src/app/model/password-change-dto';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  passwordDto!: PasswordChangeDto
  repeated = ""

  constructor(public dialogRef: MatDialogRef<ChangePasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PasswordDialogModel, public profileService: ProfileService) { }

  ngOnInit(): void {
    this.passwordDto = this.data.passChange;
  }

  onConfirm(): void {
    this.profileService.changePassword(this.passwordDto);
    this.dialogRef.close(this.passwordDto.newPassword);
  }

  onDismiss(): void {
    this.dialogRef.close("");
  }
}

export class PasswordDialogModel {
  constructor(
    public passChange: PasswordChangeDto
  ) { }
}
