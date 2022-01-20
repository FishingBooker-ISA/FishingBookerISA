import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AdditionalService } from 'src/app/model/additional-service';
import { Adventure } from 'src/app/model/adventure';
import { ManagingAdventuresService } from 'src/app/services/managing-adventures.service';
import { ManagingImagesService } from 'src/app/services/managing-images.service';
import { PromoActionsService } from 'src/app/services/promo-actions.service';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../../confirm-dialog/confirm-dialog.component';
import { EditAdditionalDialogModel, EditAdditionalServicesComponent } from '../../edit-additional-services/edit-additional-services.component';
import { ImagesDialogModel, ShowImagesComponent } from '../../show-images/show-images.component';
import { Image } from 'src/app/model/image';
import { LocationCoords, ShowLocationOnMapComponent } from '../../show-location-on-map/show-location-on-map.component';

@Component({
  selector: 'app-adventure-profile',
  templateUrl: './adventure-profile.component.html',
  styleUrls: ['./adventure-profile.component.css']
})
export class AdventureProfileComponent implements OnInit {

  adventureId!: number;
  adventure!: Adventure;
  editingMode!: boolean;
  createReservation!: boolean
  additional!: AdditionalService[]
  promoActions!: boolean;
  calendarView!: boolean;
  images = [] as SafeResourceUrl[]
  imgSrc!: any

  constructor(private route: ActivatedRoute, public service: ManagingAdventuresService, private router: Router,
    public dialog: MatDialog, public managingImages: ManagingImagesService, private sanitizer: DomSanitizer,
    public actionsService: PromoActionsService, private _snackBar: MatSnackBar) {
    this.route.params.subscribe((params) => {
      this.adventureId = +params['id'];
    });
  }

  ngOnInit(): void {
    this.createReservation = false;
    this.editingMode = false;
    this.promoActions = false
    this.calendarView = false
    this.service.getAdventureById(this.adventureId).subscribe((data) => this.adventure = data);
    this.actionsService.getAllAdditionalServices(this.adventureId).subscribe((data) => this.additional = data);
    this.imageFromDatabase();
  }

  editAdventure() {
    this.editingMode = true;
    this.createReservation = false;
    this.calendarView = false;
    this.promoActions = false;
  }

  createAction() {
    this.promoActions = true;
    this.createReservation = false;
    this.calendarView = false
  }

  createNewReservation() {
    this.createReservation = true;
    this.promoActions = false;
    this.calendarView = false;
  }

  viewCalendar() {
    this.calendarView = true;
    this.promoActions = false;
    this.createReservation = false;
  }

  deleteAdventure() {
    const message = 'Are you sure you want to delete this adventure?';

    const dialogData = new ConfirmDialogModel(
      'Confirm deleting adventure',
      message
    );

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '600px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.service.deleteAdventure(this.adventureId).subscribe(
          (data) => {
            this._snackBar.open("Successfully deleted!", 'Dissmiss', {
              duration: 3000
            });

            setTimeout(() => {
              this.router.navigate(['/instructor/home']);
            }, 1000);
          },
          (error) => {
            this._snackBar.open("Adventure has reservations and can't be deleted!", 'Dissmiss', {
              duration: 3000
            });
          });;;
      }
    });
  }

  imageFromDatabase() {
    this.images = []
    this.managingImages.getImages(this.adventureId).toPromise().then(
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
      this.adventure.id
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
      this.additional, this.adventureId
    );

    const dialogRef = this.dialog.open(EditAdditionalServicesComponent, {
      maxWidth: '800px',
      width: '430px',
      data: dialogData,
    });

    dialogRef.backdropClick().subscribe((dialogResult) => {
      this.actionsService.getAllAdditionalServices(this.adventureId).subscribe((data) => this.additional = data);
    });
  }

  openMap() {
    const dialogData = new LocationCoords(
      this.adventure.address.longitude, this.adventure.address.latitude
    );

    const dialogRef = this.dialog.open(ShowLocationOnMapComponent, {
      maxWidth: '800px',
      width: '600px',
      height: '600px',
      data: dialogData,
    });
  }

}
