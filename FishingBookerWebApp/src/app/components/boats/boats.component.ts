import { Component, OnInit } from '@angular/core';
import { DisplayServiceShortDTO } from 'src/app/model/display-service-short';
import { DisplayEstateShortDTO } from 'src/app/model/estate';
import { User } from 'src/app/model/user';
import { ManagingEstateService } from 'src/app/services/managing-estate.service';
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
  currentUser!: User
  isClient:boolean = false;
  todayDate: Date = new Date();
  startDate!: Date;
  endDate!: Date;
  capacity: number = 2;


  constructor(private _estateService : ManagingShipsService, public signupService: SignupOwnersService) { }

  ngOnInit(): void {
    this.signupService.getUser().subscribe((data) => {
      this.currentUser = data;
      if(this.currentUser.role.name == "ROLE_CLIENT"){
        this.isClient = true;
      }

    });
    this.currentUser = this.signupService.currentUser;
    this.getAllEstates();
  }

  getAllEstates() {
    this._estateService.getAllShips().subscribe((data) => {this.ships = data; this.backupShips = Array.from(data);})
  }

  search(){
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
    this._estateService.getShipsByName(input).subscribe((data) => {this.ships = data; this.backupShips = Array.from(data);})
  }
  searchByCity(input: string) {
    this._estateService.getShipsByCity(input).subscribe((data) => {this.ships = data; this.backupShips = Array.from(data);})
  }

}
