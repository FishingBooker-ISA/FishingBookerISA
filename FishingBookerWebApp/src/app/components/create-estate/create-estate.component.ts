import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdditionalServiceDTO } from 'src/app/model/additional-service';
import { createEstateDTO, Estate } from 'src/app/model/estate';
import { ManagingEstateService } from 'src/app/services/managing-estate.service';
import { MapModalComponent } from '../map-modal/map-modal.component';
import { AddEquipmentComponent, AddNewItemDialogModel } from './add-equipment/add-equipment.component';

@Component({
  selector: 'app-create-estate',
  templateUrl: './create-estate.component.html',
  styleUrls: ['./create-estate.component.css']
})
export class CreateEstateComponent implements OnInit {

  estate!: createEstateDTO
  errorMessage = ""
  found!: boolean
  additionalEquipment = ""

  constructor(public dialog: MatDialog,
    public dialogRef: MatDialogRef<CreateEstateComponent>, @Inject(MAT_DIALOG_DATA) public data: DetailsDialogModel,
    public managingEstateService: ManagingEstateService, private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { this.estate = this.data.estate; console.log(this.estate) }
  onConfirm(): void {
    this.managingEstateService.createEstate(this.estate).subscribe(
      (data) => {
        this._snackBar.open("Successfully created!", 'Dissmiss', {
          duration: 3000
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      },
      (error) => {
        this._snackBar.open("You already have an estate with this name!", 'Dissmiss', {
          duration: 3000
        });
      });;
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }

  hasErrors() {

    if (this.estate.name === "" || this.estate.pricePerDay === null ||
      this.estate.numOfBeds === null || this.estate.numOfRooms === null ||
      this.estate.description === "" || this.estate.termsOfUse === "" ||
      this.estate.capacity === null || this.estate.additionalServiceList.length === 0) {
      return true;
    }

    if (this.estate.name === undefined || this.estate.pricePerDay === undefined ||
      this.estate.numOfBeds === undefined || this.estate.numOfRooms === undefined ||
      this.estate.description === undefined || this.estate.termsOfUse === undefined ||
      this.estate.capacity === undefined) {
      return true;
    }

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
        for (let item of this.estate.additionalServiceList) {
          if (item.name == dialogResult.name) {
            this.found = true
            this.errorMessage = "Can't add two additional services with the same name!"
          }
        }

        if (!this.found) {
          this.estate.additionalServiceList.push(dialogResult);
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
      this.estate.street = address.street;
      this.estate.city = address.city;
      this.estate.country = address.country;
      this.estate.number = address.number;
      this.estate.postcode = address.postcode;
      this.estate.longitude = address.longitude;
      this.estate.latitude = address.latitude;
    })
  }
}

export class DetailsDialogModel {
  constructor(
    public estate: createEstateDTO
  ) { }
}

