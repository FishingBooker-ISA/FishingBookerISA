import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AdditionalService } from 'src/app/model/additional-service';
import { Estate } from 'src/app/model/estate';
import { Image } from 'src/app/model/image';
import { User } from 'src/app/model/user';
import { ManagingEstateService } from 'src/app/services/managing-estate.service';
import { ManagingImagesService } from 'src/app/services/managing-images.service';
import { PromoActionsService } from 'src/app/services/promo-actions.service';
import { SignupOwnersService } from 'src/app/services/signup-owners.service';

@Component({
  selector: 'app-estate-client-profile',
  templateUrl: './estate-client-profile.component.html',
  styleUrls: ['./estate-client-profile.component.css']
})
export class EstateClientProfileComponent implements OnInit {
  estateId!: number;
  editingMode!: boolean;
  promoActions!: boolean;
  createReservation!: boolean
  calendarView!: boolean;
  images = [] as SafeResourceUrl[]
  estate!: Estate;
  imgSrc!: any
  additional!: AdditionalService[]
  averageMark!: any
  currentUser!: User
  isClient: boolean = false;
  isSubscribed: boolean = false;

  constructor(public signupService: SignupOwnersService, private route: ActivatedRoute, public managingEstateService: ManagingEstateService, private router: Router,
    public dialog: MatDialog, public managingImages: ManagingImagesService, private sanitizer: DomSanitizer,
    public actionsService: PromoActionsService, private _snackBar: MatSnackBar) {
    this.route.params.subscribe((params) => {
      this.estateId = +params['id'];
    });
  }

  ngOnInit(): void {
    this.editingMode = false
    this.promoActions = false
    this.createReservation = false;
    this.calendarView = false
    this.managingEstateService.getEstateById(this.estateId).subscribe((data) => this.estate = data);
    this.managingEstateService.getAverageRating(this.estateId).subscribe((data) => this.averageMark = data);
    this.actionsService.getAllAdditionalServices(this.estateId).subscribe((data) => this.additional = data);
    this.imageFromDatabase();
    this.signupService.getUser().subscribe((data) => {
      this.currentUser = data;
      if (this.currentUser.role.name == "ROLE_CLIENT") {
        this.isClient = true;
      }
    });
  }
  viewCalendar() {
    this.calendarView = true;
    this.createReservation = false;
    this.promoActions = false;
    this.editingMode = false;
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
  openMap() {
    /*const dialogData = new LocationCoords(
      this.estate.address.longitude, this.estate.address.latitude
    );

    const dialogRef = this.dialog.open(ShowLocationOnMapComponent, {
      maxWidth: '800px',
      width: '600px',
      height: '600px',
      data: dialogData,
    });*/
  }

  subscribe(){

  }
  

}
