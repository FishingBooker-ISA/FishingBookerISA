import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { PromoAction } from 'src/app/model/action';
import { AdditionalService } from 'src/app/model/additional-service';
import { Image } from 'src/app/model/image';
import { Ship, NavigationToolDTO, ShipNavigationTool } from 'src/app/model/ship';
import { User } from 'src/app/model/user';
import { ManagingImagesService } from 'src/app/services/managing-images.service';
import { ManagingShipsService } from 'src/app/services/managing-ships-service.service';
import { PromoActionsService } from 'src/app/services/promo-actions.service';
import { ReservationsService } from 'src/app/services/reservations.service';
import { SignupOwnersService } from 'src/app/services/signup-owners.service';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { ImagesDialogModel, ShowImagesComponent } from '../show-images/show-images.component';
import { LocationCoords, ShowLocationOnMapComponent } from '../show-location-on-map/show-location-on-map.component';


@Component({
  selector: 'app-boat-client-profile',
  templateUrl: './boat-client-profile.component.html',
  styleUrls: ['./boat-client-profile.component.css']
})
export class BoatClientProfileComponent implements OnInit {

  
  shipId!: number;
  editingMode!: boolean;
  promoActions!: boolean;
  createReservation!: boolean
  calendarView!: boolean;
  images = [] as SafeResourceUrl[]
  ship!: Ship
  imgSrc!: any
  additional!: AdditionalService[]
  navigationTools = [] as ShipNavigationTool[]
  
  averageMark!: any
  currentUser!: User
  isClient: boolean = false;
  isSubscribed: boolean = false;
  actions = [] as PromoAction[]

  constructor(public reservationsService: ReservationsService, public subscriptionsService: SubscriptionService, public signupService: SignupOwnersService, private route: ActivatedRoute, public managingShipService: ManagingShipsService, private router: Router,
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
    this.calendarView = false;
    this.managingShipService.getShipById(this.shipId).subscribe((data) => this.ship = data);
    this.actionsService.getAllAdditionalServices(this.shipId).subscribe((data) => this.additional = data);
    this.managingShipService.getAllNavigationTools(this.shipId).subscribe((data) => this.navigationTools = data);
    this.actionsService.getAllActionsForService(this.shipId).subscribe((data) => this.actions = data);
    this.imageFromDatabase();
    this.signupService.getUser().subscribe((data) => {
      this.currentUser = data;
      if (this.currentUser.role.name == "ROLE_CLIENT") {
        this.isClient = true;
        this.subscriptionsService.checkIfSubscribed(this.currentUser.id, this.shipId).subscribe((res) => this.isSubscribed = res)
      }
    });
  }

  viewCalendar() {
    this.calendarView = true;
    this.promoActions = false;
    this.editingMode = false;
    this.createReservation = false;
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

  openMap() {
    /*const dialogData = new LocationCoords(
      this.ship.address.longitude, this.ship.address.latitude
    );

    const dialogRef = this.dialog.open(ShowLocationOnMapComponent, {
      maxWidth: '800px',
      width: '600px',
      height: '600px',
      data: dialogData,
    });*/
  }

  subscribe() {
    this.subscriptionsService.subscribe(this.currentUser.id, this.shipId);
    this.isSubscribed = true;
  }

  makeReservation(id: number) {
    this.reservationsService.makeActionReservation(id).subscribe((res) => {
      if (res){
        this._snackBar.open("Successfully created!", 'Dissmiss', {
          duration: 3000
        });
      }
      else {
        this._snackBar.open("Error occured! Overlapping reservations or unavailable action.", 'Dissmiss', {
          duration: 3000
        });
      }
    });
  }

}
