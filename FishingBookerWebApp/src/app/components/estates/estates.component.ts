import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DisplayServiceShortDTO } from 'src/app/model/display-service-short';
import { ServiceAvailabilityParametersDTO } from 'src/app/model/service-availability-parametersDTO';
import { User } from 'src/app/model/user';
import { ClientProfileService } from 'src/app/services/client-profile.service';
import { ManagingEstateService } from 'src/app/services/managing-estate.service';
import { SignupOwnersService } from 'src/app/services/signup-owners.service';
import { ClientReservationDialogComponent } from '../client-reservation-dialog/client-reservation-dialog.component';

@Component({
  selector: 'app-estates',
  templateUrl: './estates.component.html',
  styleUrls: ['./estates.component.css']
})
export class EstatesComponent implements OnInit {
  public availableEstates: DisplayServiceShortDTO[] = [];
  public backupEstates: DisplayServiceShortDTO[] = [];
  public estates: DisplayServiceShortDTO[] = [];
  public searched: DisplayServiceShortDTO[] = [];

  public searchText: string = "";
  public searchCriteria: string = "name";
  public ratingFrom = 0;
  public ratingTo = 5;
  public location = "any";
  public sortOrder = "asc";
  public sortCriteria = "";

  todayDate: Date = new Date();
  startDate: Date = new Date();
  endDate: Date = new Date();
  capacity: number = 2;
  currentUser!: User
  isClient: boolean = false;
  isAvailableFound = false;
  isClientBlocked = false;
  isClientAvailable = true;
  warningMessage = "";
  isFilled = false;



  constructor(public reservationDialog: MatDialog, private clientProfileService: ClientProfileService, private estateService: ManagingEstateService, public signupService: SignupOwnersService) { }

  ngOnInit(): void {
    this.signupService.getUser().subscribe((data) => {
      this.currentUser = data;
      if (this.currentUser.role.name == "ROLE_CLIENT") {
        this.isClient = true;
        this.clientProfileService.getClientPenalties(this.currentUser.id).subscribe((res) => {
          let numberOfPenalties = res;
          if (numberOfPenalties >= 3) {
            this.isClientBlocked = true;
            this.warningMessage = "Not allowed to make reservations (more than 3 penalties)."
          }
        });
      }
    });
    this.currentUser = this.signupService.currentUser;
    this.estateService.getAllEstates().subscribe((data) => { this.availableEstates = data; this.estates = Array.from(data); this.backupEstates = Array.from(data); })

  }

  openReservationDialog(name:string, sid:number, price:number){
    const dialogRef = this.reservationDialog.open(ClientReservationDialogComponent, {
      width: '450px',
      data: { serviceName: name, serviceId: sid, servicePrice: price, startDate: this.startDate, endDate: this.endDate, clientId: this.currentUser.id},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  findAvailable() {
    this.isAvailableFound = true;
    let parameters: ServiceAvailabilityParametersDTO = new ServiceAvailabilityParametersDTO();
    parameters.startDate = this.startDate;
    parameters.endDate = this.endDate;
    parameters.capacity = this.capacity;


    this.estateService.findAvailableEstates(parameters).subscribe((data) => { this.availableEstates = data; this.estates = Array.from(data); this.backupEstates = Array.from(data); })
  }

  clear() {
    this.isAvailableFound = false;
    this.startDate = new Date();
    this.endDate = new Date();
    this.capacity = 2;
    this.estateService.getAllEstates().subscribe((data) => { this.availableEstates = data; this.estates = Array.from(data); this.backupEstates = Array.from(data); })
    this.searchText = "";
    this.searchCriteria = "name";
    this.ratingFrom = 0;
    this.ratingTo = 5;
    this.location = "any";
    this.sortOrder = "asc";
    this.sortCriteria = "";
  }

  getAllEstates() {
    this.estateService.getAllEstates().subscribe((data) => {
      this.estates = data;
      this.backupEstates = Array.from(data);
      this.estates = [];
      for (let ae of this.availableEstates) {
        for (let se of this.backupEstates) {
          if (se.id == ae.id)
            this.estates.push(se);
        }
      }
      this.backupEstates = Array.from(this.estates)
    })
  }

  search() {
    if (this.searchText === "")
      this.getAllEstates();
    else if (this.searchCriteria == "name")
      this.searchByName(this.searchText);
    else if (this.searchCriteria == "location")
      this.searchByCity(this.searchText);

    this.ratingFrom = 0;
    this.ratingTo = 5;
    this.location = "any";
    this.sortOrder = "asc";
    this.sortCriteria = "";
    this.applyFilterAndSort();
  }

  applyFilterAndSort() {
    this.applyFilter();

    this.applySort();
  }

  applySort() {
    switch (this.sortCriteria) {
      case "name":
        {
          if (this.sortOrder == "asc")
            this.estates = this.estates.sort((a, b) => (a.name > b.name ? 1 : -1));
          else
            this.estates = this.estates.sort((a, b) => (a.name > b.name ? -1 : 1));
          break;
        }
      case "city":
        {
          if (this.sortOrder == "asc")
            this.estates = this.estates.sort((a, b) => (a.address.city > b.address.city ? 1 : -1));
          else
            this.estates = this.estates.sort((a, b) => (a.address.city > b.address.city ? -1 : 1));
          break;
        }
      case "rating":
        {
          if (this.sortOrder == "asc")
            this.estates = this.estates.sort((a, b) => (a.rating > b.rating ? 1 : -1));
          else
            this.estates = this.estates.sort((a, b) => (a.rating > b.rating ? -1 : 1));
          break;
        }
      case "price":
        {
          if (this.sortOrder == "asc")
            this.estates = this.estates.sort((a, b) => (a.pricePerDay > b.pricePerDay ? 1 : -1));
          else
            this.estates = this.estates.sort((a, b) => (a.pricePerDay > b.pricePerDay ? -1 : 1));
          break;
        }
    }
  }

  applyFilter() {
    this.estates = Array.from(this.backupEstates);
    switch (this.location) {
      case "any": this.estates = this.estates.filter((e) => true); break;
      default: this.estates = this.estates.filter((e) => e.address.city.toLowerCase() == this.location);
    }
    if (this.ratingFrom > 0) {
      this.estates = this.estates.filter((e) => e.rating >= this.ratingFrom);
    }
    if (this.ratingTo < 5) {
      this.estates = this.estates.filter((e) => e.rating <= this.ratingTo);
    }
  }

  searchByName(input: string) {
    this.estateService.getEstatesByName(input).subscribe((data) => {
      this.estates = data;
      this.backupEstates = Array.from(data);
      this.estates = [];
      for (let ae of this.availableEstates) {
        for (let se of this.backupEstates) {
          if (se.id == ae.id)
            this.estates.push(se);
        }
      }
      this.backupEstates = Array.from(this.estates)
    })
  }
  searchByCity(input: string) {
    this.estateService.getEstatesByCity(input).subscribe((data) => {
      this.estates = data;
      this.backupEstates = Array.from(data);
      this.estates = [];
      for (let ae of this.availableEstates) {
        for (let se of this.backupEstates) {
          if (se.id == ae.id)
            this.estates.push(se);
        }
      }
      this.backupEstates = Array.from(this.estates)
    })
  }

}
