import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdditionalService, AdditionalServiceDTO } from 'src/app/model/additional-service';
import { Estate } from 'src/app/model/estate';
import { AdditionalServicesService } from 'src/app/services/additional-services.service';
import { PromoActionsService } from 'src/app/services/promo-actions.service';

@Component({
  selector: 'app-edit-additional-services',
  templateUrl: './edit-additional-services.component.html',
  styleUrls: ['./edit-additional-services.component.css']
})
export class EditAdditionalServicesComponent implements OnInit {

  additional!: AdditionalService[]
  selectedItem!: AdditionalService
  editClicked!: boolean
  newItem!: AdditionalServiceDTO
  addNewItem!: boolean
  id!: number

  constructor(public dialogRef: MatDialogRef<EditAdditionalServicesComponent>, @Inject(MAT_DIALOG_DATA)
  public data: EditAdditionalDialogModel,
    public additionalServices: AdditionalServicesService, public actionServices: PromoActionsService) { }

  ngOnInit(): void {
    this.additional = this.data.additional; this.editClicked = false; this.id = this.data.id;
    this.addNewItem = false; this.newItem = new AdditionalServiceDTO();
  }

  selectItem(item: AdditionalService) {
    this.selectedItem = item
  }

  edit() {
    this.editClicked = !this.editClicked;

    let dto: AdditionalServiceDTO = {
      id: this.selectedItem.id,
      name: this.selectedItem.name,
      price: this.selectedItem.price,
      bookingServiceId: this.id
    }

    if (!this.editClicked)
      this.additionalServices.editAdditionalService(dto);
  }

  delete() {
    let dto: AdditionalServiceDTO = {
      id: this.selectedItem.id,
      name: this.selectedItem.name,
      price: this.selectedItem.price,
      bookingServiceId: this.id
    }

    this.additionalServices.deleteAdditional(dto);

    setTimeout(() => {
      this.actionServices.getAllAdditionalServices(this.id).subscribe((data) => this.additional = data);
    }, 500);
  }

  create() {
    this.addNewItem = !this.addNewItem

    let dto: AdditionalServiceDTO = {
      id: this.newItem.id,
      name: this.newItem.name,
      price: this.newItem.price,
      bookingServiceId: this.id
    }

    if (!this.addNewItem) {
      this.additionalServices.addAdditional(dto);

      setTimeout(() => {
        this.actionServices.getAllAdditionalServices(this.id).subscribe((data) => this.additional = data);
      }, 500);
    }
  }

  isReadOnly(item: AdditionalService) {
    if (this.selectedItem == item && this.editClicked) {
      return false;
    }

    return true;
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }

}

export class EditAdditionalDialogModel {
  constructor(
    public additional: AdditionalService[],
    public id: number
  ) { }
}

