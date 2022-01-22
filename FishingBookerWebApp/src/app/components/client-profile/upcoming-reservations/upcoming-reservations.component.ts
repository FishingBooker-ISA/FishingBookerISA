import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReservationDisplayDTO } from 'src/app/model/reservation-display';
import { User } from 'src/app/model/user';
import { ReservationService } from 'src/app/services/reservation.service';
import { ReservationsService } from 'src/app/services/reservations.service';
import { SignupOwnersService } from 'src/app/services/signup-owners.service';

@Component({
  selector: 'app-upcoming-reservations',
  templateUrl: './upcoming-reservations.component.html',
  styleUrls: ['./upcoming-reservations.component.css']
})
export class UpcomingReservationsComponent implements OnInit {

  public backup: ReservationDisplayDTO[] = [];
  public reservations: ReservationDisplayDTO[] = [];
  
  public sortOrder = "asc";
  public sortCriteria = "";
  public serviceType = "ALL";
  
  currentUser!: User

  constructor(private reservationsService : ReservationsService, private _snackBar: MatSnackBar, private reservationService : ReservationService, public signupService: SignupOwnersService) { }

  ngOnInit(): void {
    this.signupService.getUser().subscribe((data) => {
      this.currentUser = data;
      this.getPastReservations();
    });
  }

  cancelReservation(id: number){
    this.reservationsService.cancelReservation(id).subscribe((res) =>{
      if(res) {
        this._snackBar.open("Successfully canceled!", 'Dissmiss', {
          duration: 3000
        });
      }
      else {
        this._snackBar.open("Cannot cancel reservation that is less than three days away.", 'Dissmiss', {
          duration: 3000
        });
      }
    })
  }

  getPastReservations() {
    this.reservationService.getUpcomingReservationsForClient(this.currentUser.id).subscribe((data) => {
      this.reservations = data; 
      this.backup = Array.from(data);
    })
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
