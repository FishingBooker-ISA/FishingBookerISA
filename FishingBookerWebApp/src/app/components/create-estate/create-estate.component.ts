import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { createEstateDTO, Estate } from 'src/app/model/estate';
import { ManagingEstateService } from 'src/app/services/managing-estate.service';

@Component({
  selector: 'app-create-estate',
  templateUrl: './create-estate.component.html',
  styleUrls: ['./create-estate.component.css']
})
export class CreateEstateComponent implements OnInit {

  estate!: createEstateDTO

  constructor(
    public dialogRef: MatDialogRef<CreateEstateComponent>, @Inject(MAT_DIALOG_DATA) public data: DetailsDialogModel,
    public managingEstateService: ManagingEstateService
  ) { }

  ngOnInit(): void { this.estate = this.data.estate; console.log(this.estate) }
  onConfirm(): void {
    this.managingEstateService.createEstate(this.estate)
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }

  hasErrors() {
    if (this.estate.name === "" || this.estate.pricePerDay === null ||
      this.estate.numOfBeds === null || this.estate.numOfRooms === null ||
      this.estate.description === "" || this.estate.termsOfUse === "" ||
      this.estate.additionalEquipment === "" || this.estate.capacity === null)
      return true;

    if (this.estate.name === undefined || this.estate.pricePerDay === undefined ||
      this.estate.numOfBeds === undefined || this.estate.numOfRooms === undefined ||
      this.estate.description === undefined || this.estate.termsOfUse === undefined ||
      this.estate.additionalEquipment === undefined || this.estate.capacity === undefined)
      return true;

    return false
  }
}

export class DetailsDialogModel {
  constructor(
    public estate: createEstateDTO
  ) { }
}

