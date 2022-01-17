import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UnavailablePeriod, UnavailablePeriodDTO } from 'src/app/model/unavailable-period';

@Component({
  selector: 'app-unavailable-period-dialog',
  templateUrl: './unavailable-period-dialog.component.html',
  styleUrls: ['./unavailable-period-dialog.component.css']
})
export class UnavailablePeriodDialogComponent implements OnInit {

  newPeriod!: UnavailablePeriodDTO
  constructor(public dialogRef: MatDialogRef<UnavailablePeriodDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UnavailablePeriodDialogModel) { }

  ngOnInit(): void {
    this.newPeriod = new UnavailablePeriodDTO()
  }

  onDismiss(): void {
    this.dialogRef.close(null);
  }

  onAdd() {
    this.dialogRef.close(this.newPeriod);
  }

}

export class UnavailablePeriodDialogModel {
  constructor(
    public newItem: UnavailablePeriodDTO
  ) { }
}
