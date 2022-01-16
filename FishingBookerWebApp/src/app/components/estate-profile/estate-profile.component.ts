import { Component, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AdditionalService } from 'src/app/model/additional-service';
import { Estate } from 'src/app/model/estate';
import { Image } from 'src/app/model/image';
import { ManagingEstateService } from 'src/app/services/managing-estate.service';
import { ManagingImagesService } from 'src/app/services/managing-images.service';
import { PromoActionsService } from 'src/app/services/promo-actions.service';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';
import { EditAdditionalDialogModel, EditAdditionalServicesComponent } from '../edit-additional-services/edit-additional-services.component';
import { ImagesDialogModel, ShowImagesComponent } from '../show-images/show-images.component';

@Component({
  selector: 'app-estate-profile',
  templateUrl: './estate-profile.component.html',
  styleUrls: ['./estate-profile.component.css']
})
export class EstateProfileComponent implements OnInit {

  estateId!: number;
  editingMode!: boolean;
  promoActions!: boolean;
  images = [] as SafeResourceUrl[]
  estate!: Estate;
  imgSrc!: any
  additional!: AdditionalService[]

  constructor(private route: ActivatedRoute, public managingEstateService: ManagingEstateService, private router: Router,
    public dialog: MatDialog, public managingImages: ManagingImagesService, private sanitizer: DomSanitizer,
    public actionsService: PromoActionsService, private _snackBar: MatSnackBar) {
    this.route.params.subscribe((params) => {
      this.estateId = +params['id'];
    });
  }

  ngOnInit(): void {
    this.editingMode = false
    this.promoActions = false
    this.managingEstateService.getEstateById(this.estateId).subscribe((data) => this.estate = data);
    this.actionsService.getAllAdditionalServices(this.estateId).subscribe((data) => this.additional = data);
    this.imageFromDatabase();
  }

  editEstate() {
    this.editingMode = true;
  }

  createAction() {
    this.promoActions = true;
  }

  deleteEstate() {
    const message = 'Are you sure you want to delete this property?';

    const dialogData = new ConfirmDialogModel(
      'Confirm deleting estate',
      message
    );

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '600px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.managingEstateService.deleteEstate(this.estateId).subscribe(
          (data) => {
            this._snackBar.open("Successfully deleted!", 'Dissmiss', {
              duration: 3000
            });

            setTimeout(() => {
              this.router.navigate(['/estateOwner/home']);
            }, 1000);
          },
          (error) => {
            this._snackBar.open("Estate has reservations and can't be deleted!", 'Dissmiss', {
              duration: 3000
            });
          });;;
      }
    });
  }

  imageFromDatabase() {
    console.log("ucitavam slike")
    this.images = []
    this.managingImages.getImages(this.estateId).toPromise().then(
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
      this.estate
    );

    const dialogRef = this.dialog.open(ShowImagesComponent, {
      width: '900px',
      height: '720px',
      data: dialogData,
      panelClass: 'my-dialog'
    });
  }

  editAdditional() {
    const dialogData = new EditAdditionalDialogModel(
      this.additional, this.estate
    );

    const dialogRef = this.dialog.open(EditAdditionalServicesComponent, {
      maxWidth: '800px',
      width: '430px',
      data: dialogData,
    });

    dialogRef.backdropClick().subscribe((dialogResult) => {
      this.actionsService.getAllAdditionalServices(this.estate.id).subscribe((data) => this.additional = data);
    });
  }
}
