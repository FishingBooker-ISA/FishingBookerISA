import { Component, OnInit } from '@angular/core';
import { DisplayServiceShortDTO } from 'src/app/model/display-service-short';
import { ServiceAvailabilityParametersDTO } from 'src/app/model/service-availability-parametersDTO';
import { User } from 'src/app/model/user';
import { ClientProfileService } from 'src/app/services/client-profile.service';
import { ManagingShipsService } from 'src/app/services/managing-ships-service.service';
import { SignupOwnersService } from 'src/app/services/signup-owners.service';

@Component({
  selector: 'app-boats',
  templateUrl: './boats.component.html',
  styleUrls: ['./boats.component.css']
})
export class BoatsComponent implements OnInit {
  public availableShips: DisplayServiceShortDTO[] = [];
  public backupShips: DisplayServiceShortDTO[] = [];
  public ships: DisplayServiceShortDTO[] = [];
  public searched: DisplayServiceShortDTO[] = [];
  
  public searchText: string = "";
  public searchCriteria: string = "name";
  public ratingFrom = 0;
  public ratingTo = 5;
  public location = "any";
  public sortOrder = "asc";
  public sortCriteria = "";

  todayDate: Date = new Date();
  startDate!: Date;
  endDate!: Date;
  capacity: number = 2;
  currentUser!: User
  isClient: boolean = false;
  isAvailableFound = false;
  isClientBlocked = false;
  isClientAvailable = true;
  warningMessage = "";


  constructor(private clientProfileService: ClientProfileService, private shipService : ManagingShipsService, public signupService: SignupOwnersService) { }

  ngOnInit(): void {
    this.signupService.getUser().subscribe((data) => {
      this.currentUser = data;
      if(this.currentUser.role.name == "ROLE_CLIENT"){
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
    
    this.shipService.getAllShips().subscribe((data) => { this.availableShips = data; this.ships = Array.from(data); this.backupShips = Array.from(data); })

  }

  findAvailable() {
    this.isAvailableFound = true;
    let parameters: ServiceAvailabilityParametersDTO = new ServiceAvailabilityParametersDTO();
    parameters.startDate = this.startDate;
    parameters.endDate = this.endDate;
    parameters.capacity = this.capacity;


    this.shipService.findAvailableShips(parameters).subscribe((data) => { this.availableShips = data; this.ships = Array.from(data); this.backupShips = Array.from(data); })
  }

  clear() {
    this.isAvailableFound = false;
    this.startDate = new Date();
    this.endDate = new Date();
    this.capacity = 2;
    this.shipService.getAllShips().subscribe((data) => { this.availableShips = data; this.ships = Array.from(data); this.backupShips = Array.from(data); })
    this.searchText = "";
    this.searchCriteria = "name";
    this.ratingFrom = 0;
    this.ratingTo = 5;
    this.location = "any";
    this.sortOrder = "asc";
    this.sortCriteria = "";
  }

  getAllShips() {
    this.shipService.getAllShips().subscribe((data) => {
      this.ships = data;
      this.backupShips = Array.from(data);
      this.ships = [];
      for (let ae of this.availableShips) {
        for (let se of this.backupShips) {
          if (se.id == ae.id)
            this.ships.push(se);
        }
      }
      this.backupShips = Array.from(this.ships)
    })
  }

  search(){
    if (this.searchText === "")
      this.getAllShips();
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

  applyFilterAndSort(){
    this.applyFilter();
    
    this.applySort();
  }

  applySort() {
    switch(this.sortCriteria){
      case "name":
      {
        if(this.sortOrder == "asc")
          this.ships = this.ships.sort((a, b) => (a.name > b.name ? 1 : -1));
        else
          this.ships = this.ships.sort((a, b) => (a.name > b.name ? -1 : 1));
        break;
      }
      case "city":
      {
        if(this.sortOrder == "asc")
          this.ships = this.ships.sort((a, b) => (a.address.city > b.address.city ? 1 : -1));
        else
          this.ships = this.ships.sort((a, b) => (a.address.city > b.address.city ? -1 : 1));
        break;
      }
      case "rating":
      {
        if(this.sortOrder == "asc")
          this.ships = this.ships.sort((a, b) => (a.rating > b.rating ? 1 : -1));
        else
          this.ships = this.ships.sort((a, b) => (a.rating > b.rating ? -1 : 1));
        break;
      }
      case "price":
      {
        if(this.sortOrder == "asc")
          this.ships = this.ships.sort((a, b) => (a.pricePerDay > b.pricePerDay ? 1 : -1));
        else
          this.ships = this.ships.sort((a, b) => (a.pricePerDay > b.pricePerDay ? -1 : 1));
        break;
      }
    }
  }

  applyFilter() {
    this.ships = Array.from(this.backupShips);
    switch(this.location){
      case "any": this.ships = this.ships.filter((e) => true); break;
      default: this.ships = this.ships.filter((e) => e.address.city.toLowerCase() == this.location);
    }
    if(this.ratingFrom > 0){
      this.ships = this.ships.filter((e) => e.rating >= this.ratingFrom); 
    }
    if(this.ratingTo < 5){
      this.ships = this.ships.filter((e) => e.rating <= this.ratingTo); 
    }
  }

  searchByName(input: string) {
    this.shipService.getShipsByName(input).subscribe((data) => {
      this.ships = data;
      this.backupShips = Array.from(data);
      this.ships = [];
      for (let ae of this.availableShips) {
        for (let se of this.backupShips) {
          if (se.id == ae.id)
            this.ships.push(se);
        }
      }
      this.backupShips = Array.from(this.ships)
    })
  }
  searchByCity(input: string) {
    this.shipService.getShipsByCity(input).subscribe((data) => {
      this.ships = data;
      this.backupShips = Array.from(data);
      this.ships = [];
      for (let ae of this.availableShips) {
        for (let se of this.backupShips) {
          if (se.id == ae.id)
            this.ships.push(se);
        }
      }
      this.backupShips = Array.from(this.ships)
    })
  }

}
