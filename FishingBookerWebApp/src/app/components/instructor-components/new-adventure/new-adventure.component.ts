import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdditionalServiceDTO } from 'src/app/model/additional-service';
import { createAdventureDTO } from 'src/app/model/adventure';
import { ManagingAdventuresService } from 'src/app/services/managing-adventures.service';
import { AddEquipmentComponent, AddNewItemDialogModel } from '../../create-estate/add-equipment/add-equipment.component';
import { MapModalComponent } from '../../map-modal/map-modal.component';

@Component({
  selector: 'app-new-adventure',
  templateUrl: './new-adventure.component.html',
  styleUrls: ['./new-adventure.component.css']
})
export class NewAdventureComponent implements OnInit {

  adventure!: createAdventureDTO;
  additionalEquipment = "";
  errorMessage = "";
  found!: boolean;


  constructor(public dialogRef: MatDialogRef<NewAdventureComponent>, @Inject(MAT_DIALOG_DATA) public data: DetailsDialogModel,
    public service: ManagingAdventuresService, private _snackBar: MatSnackBar, public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.adventure = this.data.adventure;
  }

  onConfirm(): void {
    this.service.createAdventure(this.adventure)
    this.dialogRef.close(true);
    window.location.reload();
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }

  hasErrors() {
    if (this.adventure.name === "" || this.adventure.pricePerDay === null ||
      this.adventure.description === "" || this.adventure.termsOfUse === "" ||
      this.adventure.additionalServiceList.length === 0 || this.adventure.capacity === null
      || this.adventure.instructorBio === "")
      return true;

    if (this.adventure.name === undefined || this.adventure.pricePerDay === undefined ||
      this.adventure.description === undefined || this.adventure.termsOfUse === undefined
      || this.adventure.capacity === undefined
      || this.adventure.instructorBio === undefined)
      return true;

    return false
  }

  onAdd() {
    const dialogData = new AddNewItemDialogModel(
      new AdditionalServiceDTO()
    );

    const dialogRef = this.dialog.open(AddEquipmentComponent, {
      maxWidth: '800px',
      width: '430px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      this.found = false;

      if (dialogResult != null) {
        for (let item of this.adventure.additionalServiceList) {
          if (item.name == dialogResult.name) {
            this.found = true
            this.errorMessage = "Can't add two additional services with the same name!"
          }
        }

        if (!this.found) {
          this.adventure.additionalServiceList.push(dialogResult);
          this.additionalEquipment = this.additionalEquipment.concat(dialogResult.name + " " + dialogResult.price + "e, ")
          this.errorMessage = ""
        }
      }
    })
  }

  openMap() {
    const dialogRef = this.dialog.open(MapModalComponent, {
      maxWidth: '800px',
      width: '600px',
      height: '600px'
    });

    dialogRef.afterClosed().subscribe((address) => {
      this.adventure.street = address.street;
      this.adventure.city = address.city;
      this.adventure.country = address.country;
      this.adventure.number = address.number;
      this.adventure.postcode = address.postcode;
      this.adventure.longitude = address.longitude;
      this.adventure.latitude = address.latitude;
    })
  }

}

export class DetailsDialogModel {
  constructor(
    public adventure: createAdventureDTO
  ) { }
}