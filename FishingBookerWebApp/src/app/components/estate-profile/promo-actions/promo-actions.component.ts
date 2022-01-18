import { Component, Input, OnInit } from '@angular/core';
import { PromoAction } from 'src/app/model/action';
import { AdditionalService, AdditionalServiceDTO } from 'src/app/model/additional-service';
import { Estate } from 'src/app/model/estate';
import { PromoActionsService } from 'src/app/services/promo-actions.service';

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

  constructor(public actionsService: PromoActionsService) { }

  ngOnInit(): void {
    this.createMode = false
    this.actionsService.getAllActionsForService(this.id).subscribe((data) =>
      this.actions = data
    );

    this.actionsService.getAllAdditionalServices(this.id).subscribe((data) => this.additional = data);
    this.newAction = new PromoAction();


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
    this.actionsService.addPromoAction(action);

    setTimeout(() => {
      this.createMode = false
      this.actionsService.getAllActionsForService(this.id).subscribe((data) =>
        this.actions = data)
    }, 500);
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
