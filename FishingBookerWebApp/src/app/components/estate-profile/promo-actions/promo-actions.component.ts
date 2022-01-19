import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PromoAction } from 'src/app/model/action';
import { AdditionalService, AdditionalServiceDTO } from 'src/app/model/additional-service';
import { Estate } from 'src/app/model/estate';
import { User } from 'src/app/model/user';
import { PromoActionsService } from 'src/app/services/promo-actions.service';
import { SignupOwnersService } from 'src/app/services/signup-owners.service';

@Component({
  selector: 'app-promo-actions',
  templateUrl: './promo-actions.component.html',
  styleUrls: ['./promo-actions.component.css']
})
export class PromoActionsComponent implements OnInit {

  @Input()
  id!: number
  @Input()
  promoActions!: boolean
  createMode!: boolean
  actions!: PromoAction[]
  additional!: AdditionalService[]
  additionalForPromo = [] as AdditionalServiceDTO[]
  newAction!: PromoAction
  selectedDate!: Date
  currentUser!: User
  todayDate: Date = new Date()

  constructor(public actionsService: PromoActionsService, private authService: SignupOwnersService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.createMode = false
    this.actionsService.getAllActionsForService(this.id).subscribe((data) =>
      this.actions = data
    );

    this.actionsService.getAllAdditionalServices(this.id).subscribe((data) => this.additional = data);
    this.newAction = new PromoAction();

    this.authService.getUser().subscribe((data) => this.currentUser = data);
  }

  onClick() {
    this.createMode = true;
  }

  cancel() {
    this.createMode = false;
  }

  saveChanges() {
    var today = new Date();
    var Time = this.selectedDate.getTime() - today.getTime();
    var days = Time / (1000 * 3600 * 24);
    var text = "nesto"

    let action: PromoAction = {
      pricePerDay: this.newAction.pricePerDay,
      durationInDays: Math.trunc(days),
      capacity: this.newAction.capacity,
      isTaken: false,
      additional: text,
      startDate: this.newAction.startDate,
      endDate: this.newAction.endDate,
      bookingServiceId: this.id,
      additionalServices: this.additionalForPromo
    }
    console.log(action);
    this.actionsService.addPromoAction(action).subscribe(
      (data) => {
        this._snackBar.open("Successfully added!", 'Dissmiss', {
          duration: 3000
        });

        setTimeout(() => {
          this.createMode = false
          this.actionsService.getAllActionsForService(this.id).subscribe((data) =>
            this.actions = data)
        }, 500);
      },
      (error) => {
        this._snackBar.open("Dates overlap with existing reservations or unavailable period!", 'Dissmiss', {
          duration: 3000
        });
      });
  }

  addToList(added: AdditionalService) {
    const index = this.additionalForPromo.indexOf(added);

    if (index > -1)
      this.additionalForPromo.splice(index, 1);
    else {
      this.additionalForPromo.push(added);
    }
  }

}
