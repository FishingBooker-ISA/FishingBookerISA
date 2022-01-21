import { Component, OnInit } from '@angular/core';
import {Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdditionalService, AdditionalServiceDTO } from 'src/app/model/additional-service';
import { NewComplaintDTO } from 'src/app/model/complaint';
import { ClientReservationDTO } from 'src/app/model/reservation';
import { ComplaintsService } from 'src/app/services/complaints.service';
import { PromoActionsService } from 'src/app/services/promo-actions.service';
import { ReservationsService } from 'src/app/services/reservations.service';

export interface DialogData {
  serviceName: string,
  serviceId: number;
  servicePrice: number;
  startDate: Date,
  endDate:Date,
  clientId: number;
}
@Component({
  selector: 'app-client-reservation-dialog',
  templateUrl: './client-reservation-dialog.component.html',
  styleUrls: ['./client-reservation-dialog.component.css']
})
export class ClientReservationDialogComponent implements OnInit {
  additional!: AdditionalService[];

  additionalForReservation = [] as AdditionalServiceDTO[]
  
  constructor(public reservationService: ReservationsService, private _snackBar: MatSnackBar, public actionsService: PromoActionsService, public dialogRef: MatDialogRef<ClientReservationDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData,) { }

  ngOnInit(): void {
    this.actionsService.getAdditionalServices(this.data.serviceId).subscribe((data) => this.additional = data);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSend(){
    let res: ClientReservationDTO  = new ClientReservationDTO();
    res.serviceId = this.data.serviceId;
    res.clientId = this.data.clientId;
    res.additionalEquipment = "";
    if (this.additionalForReservation.length > 0){
      res.additionalEquipment += this.additionalForReservation[0].name;
      for(let i = 1; i < this.additionalForReservation.length; i++){
        res.additionalEquipment += ", ";
        res.additionalEquipment += this.additionalForReservation[i].name;
      }
    }
    res.startDate = this.data.startDate;
    res.endDate = this.data.endDate;
    res.price = this.calculatePrice();
    console.log(res);

    this.reservationService.createClientReservation(res).subscribe(
      (data) => {
        this._snackBar.open("Successfully created!", 'Dissmiss', {
          duration: 3000
        });
        this.dialogRef.close();
      },
      (error) => {
        this._snackBar.open("Entered dates overlap with existing reservation!", 'Dissmiss', {
          duration: 3000
        });
      });;
  }

  dateDiffInDays() : number{
    let a = this.data.startDate;
    let b = this.data.endDate;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24))
  }

  calculatePrice(): number {
    let ppd = this.data.servicePrice;
    for(let a of this.additionalForReservation){
      ppd += a.price;
    }
    let duration = this.dateDiffInDays()
    let price = (duration+1)*ppd;
    return price;
  }

  addToList(added: AdditionalService) {
    const index = this.additionalForReservation.indexOf(added);

    if (index > -1)
      this.additionalForReservation.splice(index, 1);
    else {
      this.additionalForReservation.push(added);
    }
  }

}
