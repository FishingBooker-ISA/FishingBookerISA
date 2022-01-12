import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { createAdventureDTO } from 'src/app/model/adventure';
import { ManagingAdventuresService } from 'src/app/services/managing-adventures.service';

@Component({
  selector: 'app-new-adventure',
  templateUrl: './new-adventure.component.html',
  styleUrls: ['./new-adventure.component.css']
})
export class NewAdventureComponent implements OnInit {

  adventure! : createAdventureDTO

  constructor( public dialogRef: MatDialogRef<NewAdventureComponent>, @Inject(MAT_DIALOG_DATA) public data: DetailsDialogModel,
  public service: ManagingAdventuresService) { }

  ngOnInit(): void {
    this.adventure = this.data.adventure; console.log(this.adventure)
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
      this.adventure.additionalEquipment === "" || this.adventure.capacity === null
       || this.adventure.instructorBio === "")
      return true;

    if (this.adventure.name === undefined || this.adventure.pricePerDay === undefined ||
      this.adventure.description === undefined || this.adventure.termsOfUse === undefined ||
      this.adventure.additionalEquipment === undefined || this.adventure.capacity === undefined
       || this.adventure.instructorBio === undefined)
      return true;

    return false
  }

}

export class DetailsDialogModel {
  constructor(
    public adventure: createAdventureDTO
  ) { }
}