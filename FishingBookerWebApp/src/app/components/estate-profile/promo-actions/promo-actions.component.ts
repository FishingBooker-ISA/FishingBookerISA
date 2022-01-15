import { Component, Input, OnInit } from '@angular/core';
import { PromoAction } from 'src/app/model/action';
import { Estate } from 'src/app/model/estate';
import { PromoActionsService } from 'src/app/services/promo-actions.service';

@Component({
  selector: 'app-promo-actions',
  templateUrl: './promo-actions.component.html',
  styleUrls: ['./promo-actions.component.css']
})
export class PromoActionsComponent implements OnInit {

  @Input()
  estate!: Estate
  @Input()
  promoActions!: boolean
  createMode!: boolean
  actions!: PromoAction[]
  newAction!: PromoAction
  selectedDate!: Date

  constructor(public actionsService: PromoActionsService) { }

  ngOnInit(): void {
    this.createMode = false
    this.actionsService.getAllActionsForService(this.estate.id).subscribe((data) =>
      this.actions = data
    );
    this.newAction = new PromoAction();
    console.log(this.estate);

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

    let action: PromoAction = {
      pricePerDay: this.newAction.pricePerDay,
      durationInDays: Math.trunc(days),
      capacity: this.newAction.capacity,
      isTaken: false,
      additional: this.newAction.additional,
      startDate: this.newAction.startDate,
      endDate: this.newAction.endDate,
      bookingServiceId: this.estate.id
    }

    this.actionsService.addPromoAction(action);

    setTimeout(() => {
      this.createMode = false
      this.actionsService.getAllActionsForService(this.estate.id).subscribe((data) =>
        this.actions = data)
    }, 500);
  }

}
