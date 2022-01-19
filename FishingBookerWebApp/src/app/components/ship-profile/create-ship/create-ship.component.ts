import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdditionalServiceDTO } from 'src/app/model/additional-service';
import { Ship, ShipDTO, NavigationToolDTO } from 'src/app/model/ship';
import { ManagingShipsService } from 'src/app/services/managing-ships-service.service';
import { AddEquipmentComponent, AddNewItemDialogModel } from '../../create-estate/add-equipment/add-equipment.component';
import { AddNavigationToolsComponent, NewNavigationToolDialog } from './add-navigation-tools/add-navigation-tools.component';

@Component({
  selector: 'app-create-ship',
  templateUrl: './create-ship.component.html',
  styleUrls: ['./create-ship.component.css']
})
export class CreateShipComponent implements OnInit {

  ship!: ShipDTO
  errorMessage = ""
  found!: boolean
  additionalEquipment = ""
  navigationTools = ""

  constructor(public dialog: MatDialog,
    public dialogRef: MatDialogRef<CreateShipComponent>, @Inject(MAT_DIALOG_DATA) public data: CreateShipDialog,
    public managingShipService: ManagingShipsService, private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { this.ship = this.data.ship; console.log(this.ship) }
  onConfirm(): void {
    this.managingShipService.createShip(this.ship).subscribe(
      (data) => {
        this._snackBar.open("Successfully created!", 'Dissmiss', {
          duration: 3000
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      },
      (error) => {
        this._snackBar.open("You already have an ship with this name!", 'Dissmiss', {
          duration: 3000
        });
      });;
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }

  hasErrors() {

    if (this.ship.name === "" || this.ship.pricePerDay === null ||
      this.ship.numOfEngines === null || this.ship.length === null || this.ship.powerOfEngines == null ||
      this.ship.maxSpeed === null ||
      this.ship.description === "" || this.ship.termsOfUse === "" ||
      this.ship.capacity === null || this.ship.additionalEquipmentList.length === 0 || this.ship.navigationTools.length === 0) {
      return true;
    }

    if (this.ship.name === undefined || this.ship.pricePerDay === undefined ||
      this.ship.numOfEngines === undefined || this.ship.length === undefined ||
      this.ship.powerOfEngines == undefined ||
      this.ship.maxSpeed === undefined ||
      this.ship.description === undefined || this.ship.termsOfUse === undefined ||
      this.ship.capacity === undefined) {
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
        for (let item of this.ship.additionalEquipmentList) {
          if (item.name == dialogResult.name) {
            this.found = true
            this.errorMessage = "Can't add two additional services with the same name!"
          }
        }

        if (!this.found) {
          this.ship.additionalEquipmentList.push(dialogResult);
          this.additionalEquipment = this.additionalEquipment.concat(dialogResult.name + " " + dialogResult.price + "e, ")
          this.errorMessage = ""
        }
      }
    })
  }

  onAddTools() {
    const dialogData = new NewNavigationToolDialog(
      new NavigationToolDTO()
    );

    const dialogRef = this.dialog.open(AddNavigationToolsComponent, {
      maxWidth: '800px',
      width: '430px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      this.found = false;

      if (dialogResult != null) {
        for (let item of this.ship.navigationTools) {
          if (item.name == dialogResult.name) {
            this.found = true
            this.errorMessage = "Can't add two navigation tools with the same name!"
          }
        }

        if (!this.found) {
          this.ship.navigationTools.push(dialogResult);
          this.navigationTools = this.navigationTools.concat(dialogResult.name + " " + dialogResult.description + "e, ")
          this.errorMessage = ""
        }
      }
    })
  }
}

export class CreateShipDialog {
  constructor(
    public ship: ShipDTO
  ) { }
}
