import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { Ship, ShipType } from 'src/app/model/ship';
import { ManagingImagesService } from 'src/app/services/managing-images.service';
import { ManagingShipsService } from 'src/app/services/managing-ships-service.service';
import { ImagesDialogModel, ShowImagesComponent } from '../../show-images/show-images.component';

@Component({
  selector: 'app-edit-ship-profile',
  templateUrl: './edit-ship-profile.component.html',
  styleUrls: ['./edit-ship-profile.component.css']
})
export class EditShipProfileComponent implements OnInit {

  @Input()
  ship!: Ship
  @Input()
  editingMode!: boolean
  imgSrc!: any
  fileToUpload: File | null = null;
  foundImages = [] as any
  uploadedImgs = [] as any
  errorMessage = ""
  shipType = ShipType

  constructor(public managingShipService: ManagingShipsService, public managingImages: ManagingImagesService,
    private sanitizer: DomSanitizer, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  cancelEditing() {
    this.editingMode = false;
    window.location.reload()
  }

  hasErrors() {
    if (this.ship.name === "" || this.ship.pricePerDay === null ||
      this.ship.numOfEngines === null || this.ship.powerOfEngines === null || this.ship.maxSpeed === null ||
      this.ship.description === "" || this.ship.termsOfUse === "" || this.ship.capacity === null)
      return true;

    return false
  }

  saveChanges() {
    this.managingShipService.editShip(this.ship).subscribe(
      (data) => {
        this._snackBar.open("Successfully updated!", 'Dissmiss', {
          duration: 3000
        });
        //window.location.reload();
      },
      (error) => {
        this._snackBar.open("Ship has reservations and can't be edited!", 'Dissmiss', {
          duration: 3000
        });
      });;
  }

  viewImages(): void {
    /*const dialogData = new ImagesDialogModel(
      this.ship
    );

    const dialogRef = this.dialog.open(ShowImagesComponent, {
      width: '900px',
      height: '720px',
      data: dialogData,
      panelClass: 'my-dialog'
    });*/
  }

}
