import { Component, Inject, OnInit } from '@angular/core';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EventApi, EventClickArg } from '@fullcalendar/angular';
import { PromoAction } from 'src/app/model/action';
import { ReportDTO } from 'src/app/model/report';
import { Reservation } from 'src/app/model/reservation';
import { ReportsService } from 'src/app/services/reports.service';
import { UnavailablePeriodDialogComponent, UnavailablePeriodDialogModel } from '../unavailable-period-dialog/unavailable-period-dialog.component';

@Component({
  selector: 'app-details-dialog',
  templateUrl: './details-dialog.component.html',
  styleUrls: ['./details-dialog.component.css']
})
export class DetailsDialogComponent implements OnInit {

  action!: PromoAction
  reservation!: Reservation
  writeReport!: boolean

  reservationStart = ""
  reservationEnd!: string
  reservationCreated!: string
  canceled!: string

  actionStart!: string
  actionEnd!: string
  duration!: string
  taken!: string
  additionalEquipment = ""

  text!:string;
  sanctionClient!:boolean;
  clientDidntShowUp!:boolean
  report!: ReportDTO;

  constructor(public dialogRef: MatDialogRef<DetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserDetails, public service: ReportsService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.sanctionClient = false;
    this.text='';
    this.clientDidntShowUp = true;

    this.writeReport = false;
    console.log(this.data.action);

    this.action = this.data.action
    this.reservation = this.data.reservation

    if (!this.isActionEmpty()) {
      this.actionStart = new Date(this.action.startDate).toISOString().slice(0, 10)
      this.actionEnd = new Date(this.action.endDate).toISOString().slice(0, 10)
      this.duration = this.action.durationInDays + " days"

      if (this.action.isTaken)
        this.taken = "Reserved"
      else
        this.taken = "Not reserved"

      for (let i of this.action.additionalServices) {
        this.additionalEquipment = this.additionalEquipment.concat(i.name + " " + i.price + ", ")
      }

    }

    if (!this.isReservationEmpty()) {
      this.reservationStart = new Date(this.reservation.reservationStart).toISOString().slice(0, 10)
      this.reservationEnd = new Date(this.reservation.reservationEnd).toISOString().slice(0, 10)
      this.reservationCreated = new Date(this.reservation.reservedDate).toISOString().slice(0, 10)

      if (this.reservation.isCanceled)
        this.canceled = "Cancelled"
      else
        this.canceled = "Not cancelled"
    }
  }

  onDismiss() {
    this.dialogRef.close();
  }

  isActionEmpty() {
    return (this.action && (Object.keys(this.action).length === 0))
  }

  isReservationEmpty() {
    return (this.reservation && (Object.keys(this.reservation).length === 0))
  }

  cancelReport(){
    this.writeReport = false;
    this.text = '';
    this.sanctionClient = false;
    this.clientDidntShowUp = false;
  }

  submitReport(){
    this.report = new ReportDTO;
    this.report.reportText = this.text;
    this.report.clientDidntShowUp = this.clientDidntShowUp;
    this.report.createdOn = new Date;
    this.report.sanctionClient = this.sanctionClient;
    this.report.reservationId = this.reservation.id;
    this.service.createReport(this.report).subscribe(
      (data) => {
        this._snackBar.open('Report successfully submitted', 'Dissmiss', {
          duration: 3000
        });

        setTimeout(() => {
        }, 1000);
      },
      (error) => {
        this._snackBar.open('Report already exists!', 'Dissmiss', {
          duration: 3000
        });
      });;;
    this.writeReport = false;
  }

  isSubmitDisabled(){
    if(this.clientDidntShowUp)
      return false;
    else if(this.text === '')
      return true;
    else
      return false;
  }

  canWriteReport(){
    if(this.reservation.reservationEnd > new Date())
      return false;
    return true;
  }
}

export class UserDetails {
  constructor(
    public action: PromoAction,
    public reservation: Reservation
  ) { }
}
