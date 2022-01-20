import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReservationDisplayDTO } from 'src/app/model/reservation-display';
import { User } from 'src/app/model/user';
import { ReservationService } from 'src/app/services/reservation.service';
import { SignupOwnersService } from 'src/app/services/signup-owners.service';
import { CreateComplaintComponent } from '../create-complaint/create-complaint.component';
import { CreateReviewComponent } from '../create-review/create-review.component';

@Component({
  selector: 'app-estate-reservation-history',
  templateUrl: './estate-reservation-history.component.html',
  styleUrls: ['./estate-reservation-history.component.css']
})
export class EstateReservationHistoryComponent implements OnInit {

  public backup: ReservationDisplayDTO[] = [];
  public reservations: ReservationDisplayDTO[] = [];
  
  public sortOrder = "asc";
  public sortCriteria = "";
  public serviceType = "ALL";
  
  currentUser!: User

  constructor(private reservationService : ReservationService, public signupService: SignupOwnersService, public reviewDialog: MatDialog, public complaintDialog: MatDialog) { }

  ngOnInit(): void {
    this.signupService.getUser().subscribe((data) => {
      this.currentUser = data;
      this.getPastReservations();
    });
  }

  getPastReservations() {
    this.reservationService.getPastReservationsForClient(this.currentUser.id).subscribe((data) => {
      this.reservations = data; 
      this.backup = Array.from(data);
    })
  }

  openReviewDialog(sid:number){
    const dialogRef = this.reviewDialog.open(CreateReviewComponent, {
      width: '450px',
      data: { clientId: this.currentUser.id, serviceId: sid},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openComplaintDialog(sid:number){
    const dialogRef = this.reviewDialog.open(CreateComplaintComponent, {
      width: '450px',
      data: { clientId: this.currentUser.id, serviceId: sid},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  applySort() {
    switch(this.sortCriteria){
      case "name":
      {
        if(this.sortOrder == "asc")
          this.reservations = this.reservations.sort((a, b) => (a.serviceName > b.serviceName ? 1 : -1));
        else
          this.reservations = this.reservations.sort((a, b) => (a.serviceName > b.serviceName ? -1 : 1));
        break;
      }
      case "start":
      {
        if(this.sortOrder == "asc")
          this.reservations = this.reservations.sort((a, b) => (a.startDate > b.startDate ? 1 : -1));
        else
          this.reservations = this.reservations.sort((a, b) => (a.startDate > b.startDate ? -1 : 1));
        break;
      }
      case "duration":
      {
        if(this.sortOrder == "asc")
          this.reservations = this.reservations.sort((a, b) => (a.durationInHours > b.durationInHours ? 1 : -1));
        else
          this.reservations = this.reservations.sort((a, b) => (a.durationInHours > b.durationInHours ? -1 : 1));
        break;
      }
      case "price":
      {
        if(this.sortOrder == "asc")
          this.reservations = this.reservations.sort((a, b) => (a.totalPrice > b.totalPrice ? 1 : -1));
        else
          this.reservations = this.reservations.sort((a, b) => (a.totalPrice > b.totalPrice ? -1 : 1));
        break;
      }
    }
  }
}
