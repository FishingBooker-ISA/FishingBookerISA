import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AdditionalService } from 'src/app/model/additional-service';
import { Image } from 'src/app/model/image';
import { Ship, ShipNavigationTool } from 'src/app/model/ship';
import { ManagingImagesService } from 'src/app/services/managing-images.service';
import { ManagingShipsService } from 'src/app/services/managing-ships-service.service';
import { PromoActionsService } from 'src/app/services/promo-actions.service';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';
import { EditAdditionalDialogModel, EditAdditionalServicesComponent } from '../edit-additional-services/edit-additional-services.component';
import { ImagesDialogModel, ShowImagesComponent } from '../show-images/show-images.component';

@Component({
  selector: 'app-ship-profile',
  templateUrl: './ship-profile.component.html',
  styleUrls: ['./ship-profile.component.css']
})
export class ShipProfileComponent implements OnInit {

  shipId!: number;
  editingMode!: boolean;
  promoActions!: boolean;
  createReservation!: boolean
  calendarView!: boolean;
  images = [] as SafeResourceUrl[]
  ship!: Ship
  imgSrc!: any
  additional!: AdditionalService[]
  navigationTools!: ShipNavigationTool[]

  constructor(private route: ActivatedRoute, public managingShipService: ManagingShipsService, private router: Router,
    public dialog: MatDialog, public managingImages: ManagingImagesService, private sanitizer: DomSanitizer,
    public actionsService: PromoActionsService, private _snackBar: MatSnackBar) {
    this.route.params.subscribe((params) => {
      this.shipId = +params['id'];
    });
  }

  ngOnInit(): void {
    this.editingMode = false
    this.promoActions = false
    this.createReservation = false;
    this.calendarView = false
    this.managingShipService.getShipById(this.shipId).subscribe((data) => this.ship = data);
    this.actionsService.getAllAdditionalServices(this.shipId).subscribe((data) => this.additional = data);
    this.imageFromDatabase();
  }

  editShip() {
    this.editingMode = true;
  }

  createAction() {
    this.promoActions = true;
    this.createReservation = false;
    this.editingMode = false;
    this.calendarView = false;
  }

  createNewReservation() {
    this.createReservation = true;
    this.promoActions = false;
    this.editingMode = false;
    this.calendarView = false;
  }

  viewCalendar() {
    this.calendarView = true;
    this.promoActions = false;
    this.editingMode = false;
    this.createReservation = false;
  }

  deleteShip() {
    const message = 'Are you sure you want to delete this ship?';

    const dialogData = new ConfirmDialogModel(
      'Confirm deleting ship',
      message
    );

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '600px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.managingShipService.deleteShip(this.shipId).subscribe(
          (data) => {
            this._snackBar.open("Successfully deleted!", 'Dissmiss', {
              duration: 3000
            });

            setTimeout(() => {
              this.router.navigate(['/shipOwner/home']);
            }, 1000);
          },
          (error) => {
            this._snackBar.open("Ship has reservations and can't be deleted!", 'Dissmiss', {
              duration: 3000
            });
          });;;
      }
    });
  }

  imageFromDatabase() {
    console.log("ucitavam slike")
    this.images = []
    this.managingImages.getImages(this.shipId).toPromise().then(
      (result) => {

        for (let r of result) {
          let img: Image = {
            id: r.id,
            bytes: this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + r.bytes)
          }
          this.images.push(img.bytes)
        }
      });
  }

  isFirst(img: SafeResourceUrl) {
    if (this.images.indexOf(img) === 0)
      return true;

    return false;
  }

  viewImages(): void {
    const dialogData = new ImagesDialogModel(
      this.ship.id
    );

    const dialogRef = this.dialog.open(ShowImagesComponent, {
      width: '900px',
      height: '720px',
      data: dialogData,
      panelClass: 'my-dialog'
    });

    dialogRef.afterClosed().subscribe((data) => this.imageFromDatabase())
    dialogRef.backdropClick().subscribe((data) => this.imageFromDatabase())
  }

  editAdditional() {
    const dialogData = new EditAdditionalDialogModel(
      this.additional, this.ship.id
    );

    const dialogRef = this.dialog.open(EditAdditionalServicesComponent, {
      maxWidth: '800px',
      width: '430px',
      data: dialogData,
    });

    dialogRef.backdropClick().subscribe((dialogResult) => {
      this.actionsService.getAllAdditionalServices(this.ship.id).subscribe((data) => this.additional = data);
    });
  }

}
