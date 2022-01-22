import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdditionalService, AdditionalServiceDTO } from 'src/app/model/additional-service';
import { Estate } from 'src/app/model/estate';
import { ReservationDTO } from 'src/app/model/reservation';
import { User } from 'src/app/model/user';
import { PromoActionsService } from 'src/app/services/promo-actions.service';
import { ReservationsService } from 'src/app/services/reservations.service';

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrls: ['./create-reservation.component.css']
})
export class CreateReservationComponent implements OnInit {
  @Input()
  estate!: Estate
  @Input()
  createReservation!: boolean
  @Output()
  cancelEvent = new EventEmitter<boolean>();
  additional!: AdditionalService[];
  startDate!: Date;
  endDate!: Date;
  client!: User;
  clientName!: string;
  additionalServices!: AdditionalService[];
  error!: string;
  todayDate: Date = new Date()

  constructor(public actionsService: PromoActionsService, public reservationService: ReservationsService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.actionsService.getAllAdditionalServices(this.estate.id).subscribe((data) => this.additional = data);
    this.reservationService.getClientForReservation(this.estate.id).subscribe((data) => {
      this.client = data;
      this.clientName = this.client.firstName + " " + this.client.lastName;
    })
    this.additionalServices = [];
  }

  cancel() {
    this.cancelEvent.emit(false);
  }

  save() {
    var days = (this.endDate.getTime() - this.startDate.getTime()) / (1000 * 3600 * 24);
    let price = days * this.estate.pricePerDay;
    this.additionalServices.forEach(element => {
      price += element.price;
    });
    console.log(price);
    let additionalSer = '';
    this.additionalServices.forEach(element => {
      additionalSer += element.name + ", "
    });
    let dto: ReservationDTO = {
      reservedDate: new Date,
      reservationStart: this.startDate,
      reservationEnd: this.endDate,
      isPromo: false,
      isCanceled: false,
      additionalEquipment: additionalSer,
      price: price,
      shipOwnerRole: 0,
      userId: this.client.id,
      serviceId: this.estate.id
    }
    this.reservationService.createReservation(dto).subscribe(
      (data) => {
        this._snackBar.open("Successfully created!", 'Dissmiss', {
          duration: 3000
        });
        this.cancelEvent.emit(false);
      },
      (error) => {
        this._snackBar.open("Entered dates overlap with existing reservation!", 'Dissmiss', {
          duration: 3000
        });
      });
  }

  addToList(added: AdditionalService) {

    const index = this.additionalServices.indexOf(added);

    if (index > -1)
      this.additionalServices.splice(index, 1);
    else {
      this.additionalServices.push(added);
    }
  }

}
