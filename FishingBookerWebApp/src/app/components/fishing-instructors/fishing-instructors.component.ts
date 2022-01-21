import { Component, OnInit } from '@angular/core';
import { DisplayServiceShortDTO } from 'src/app/model/display-service-short';
import { DisplayEstateShortDTO } from 'src/app/model/estate';
import { User } from 'src/app/model/user';
import { ManagingAdventuresService } from 'src/app/services/managing-adventures.service';
import { ManagingEstateService } from 'src/app/services/managing-estate.service';
import { SignupOwnersService } from 'src/app/services/signup-owners.service';

@Component({
  selector: 'app-fishing-instructors',
  templateUrl: './fishing-instructors.component.html',
  styleUrls: ['./fishing-instructors.component.css']
})
export class FishingInstructorsComponent implements OnInit {
  public availableAdventures: DisplayServiceShortDTO[] = [];
  public backupAdventures: DisplayServiceShortDTO[] = [];
  public adventures: DisplayServiceShortDTO[] = [];
  public searched: DisplayServiceShortDTO[] = [];
  
  public searchText: string = "";
  public searchCriteria: string = "name";
  public ratingFrom = 0;
  public ratingTo = 5;
  public location: string = "any";
  public sortOrder = "asc";
  public sortCriteria = "";currentUser!: User
  isClient:boolean = false;
  todayDate: Date = new Date();
  startDate!: Date;
  endDate!: Date;
  capacity: number = 2;

  constructor(private _estateService : ManagingAdventuresService, public signupService: SignupOwnersService) { }

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
    this._estateService.getAllEstates().subscribe((data) => {this.adventures = data; this.backupAdventures = Array.from(data);})
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
          this.adventures = this.adventures.sort((a, b) => (a.name > b.name ? 1 : -1));
        else
          this.adventures = this.adventures.sort((a, b) => (a.name > b.name ? -1 : 1));
        break;
      }
      case "city":
      {
        if(this.sortOrder == "asc")
          this.adventures = this.adventures.sort((a, b) => (a.address.city > b.address.city ? 1 : -1));
        else
          this.adventures = this.adventures.sort((a, b) => (a.address.city > b.address.city ? -1 : 1));
        break;
      }
      case "rating":
      {
        if(this.sortOrder == "asc")
          this.adventures = this.adventures.sort((a, b) => (a.rating > b.rating ? 1 : -1));
        else
          this.adventures = this.adventures.sort((a, b) => (a.rating > b.rating ? -1 : 1));
        break;
      }
      case "price":
      {
        if(this.sortOrder == "asc")
          this.adventures = this.adventures.sort((a, b) => (a.pricePerDay > b.pricePerDay ? 1 : -1));
        else
          this.adventures = this.adventures.sort((a, b) => (a.pricePerDay > b.pricePerDay ? -1 : 1));
        break;
      }
    }
  }

  applyFilter() {
    this.adventures = Array.from(this.backupAdventures);
    switch(this.location){
      case "any": this.adventures = this.adventures.filter((e) => true); break;
      default: this.adventures = this.adventures.filter((e) => e.address.city.toLowerCase() == this.location);
    }
    if(this.ratingFrom > 0){
      this.adventures = this.adventures.filter((e) => e.rating >= this.ratingFrom); 
    }
    if(this.ratingTo < 5){
      this.adventures = this.adventures.filter((e) => e.rating <= this.ratingTo); 
    }
  }

  searchByName(input: string) {
    this._estateService.getEstatesByName(input).subscribe((data) => {this.adventures = data; this.backupAdventures = Array.from(data);})
  }
  searchByCity(input: string) {
    this._estateService.getEstatesByCity(input).subscribe((data) => {this.adventures = data; this.backupAdventures = Array.from(data);})
  }

  
}
