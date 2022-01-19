import { getQueryPredicate } from '@angular/compiler/src/render3/view/util';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdditionalService } from 'src/app/model/additional-service';
import { ReservationDTO } from 'src/app/model/reservation';
import { Ship } from 'src/app/model/ship';
import { User } from 'src/app/model/user';
import { PromoActionsService } from 'src/app/services/promo-actions.service';
import { ReservationsService } from 'src/app/services/reservations.service';

@Component({
  selector: 'app-create-reservation-ships',
  templateUrl: './create-reservation-ships.component.html',
  styleUrls: ['./create-reservation-ships.component.css']
})
export class CreateReservationShipsComponent implements OnInit {

  @Input()
  ship!: Ship
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
  todayDate: Date = new Date();


  constructor(public actionsService: PromoActionsService, public reservationService: ReservationsService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.actionsService.getAllAdditionalServices(this.ship.id).subscribe((data) => this.additional = data);
    this.reservationService.getClientForReservation(this.ship.id).subscribe((data) => {
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
    let price = days * this.ship.pricePerDay;
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
      shipOwnerRole: this.ship.owner.shipOwnerRole,
      userId: this.client.id,
      serviceId: this.ship.id
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
      });;
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
