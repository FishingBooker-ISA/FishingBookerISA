import { Component, OnInit } from '@angular/core';
import {Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  reason: string;
}

@Component({
  selector: 'app-deletion-request',
  templateUrl: './deletion-request.component.html',
  styleUrls: ['./deletion-request.component.css']
})
export class DeletionRequestComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeletionRequestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
