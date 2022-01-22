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
import { Image } from 'src/app/model/image';
import { User } from 'src/app/model/user';
import { PromoAction } from 'src/app/model/action';
import { SignupOwnersService } from 'src/app/services/signup-owners.service';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { ReservationsService } from 'src/app/services/reservations.service';

@Component({
  selector: 'app-adventure-client-profile',
  templateUrl: './adventure-client-profile.component.html',
  styleUrls: ['./adventure-client-profile.component.css']
})
export class AdventureClientProfileComponent implements OnInit {

  adventureId!: number;
  adventure!: Adventure;
  editingMode!: boolean;
  createReservation!: boolean
  additional!: AdditionalService[]
  promoActions!: boolean;
  calendarView!: boolean;
  images = [] as SafeResourceUrl[]
  imgSrc!: any
  averageMark!: any
  currentUser!: User
  isClient: boolean = false;
  isSubscribed: boolean = false;
  actions = [] as PromoAction[]

  constructor(public reservationsService: ReservationsService, public subscriptionsService: SubscriptionService, public signupService: SignupOwnersService, private route: ActivatedRoute, public service: ManagingAdventuresService, private router: Router,
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
    this.actionsService.getAllActionsForService(this.adventureId).subscribe((data) => this.actions = data);
    this.imageFromDatabase();
    this.signupService.getUser().subscribe((data) => {
      this.currentUser = data;
      if (this.currentUser.role.name == "ROLE_CLIENT") {
        this.isClient = true;
        this.subscriptionsService.checkIfSubscribed(this.currentUser.id, this.adventureId).subscribe((res) => this.isSubscribed = res)
      }
    });
  }

  viewCalendar() {
    this.calendarView = true;
    this.promoActions = false;
    this.createReservation = false;
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

  openMap() {
    /*const dialogData = new LocationCoords(
      this.adventure.address.longitude, this.adventure.address.latitude
    );

    const dialogRef = this.dialog.open(ShowLocationOnMapComponent, {
      maxWidth: '800px',
      width: '600px',
      height: '600px',
      data: dialogData,
    });*/
  }
  subscribe() {
    this.subscriptionsService.subscribe(this.currentUser.id, this.adventureId);
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
