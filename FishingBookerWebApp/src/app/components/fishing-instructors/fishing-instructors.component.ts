import { Component, OnInit } from '@angular/core';
import { DisplayServiceShortDTO } from 'src/app/model/display-service-short';
import { ServiceAvailabilityParametersDTO } from 'src/app/model/service-availability-parametersDTO';
import { User } from 'src/app/model/user';
import { ClientProfileService } from 'src/app/services/client-profile.service';
import { ManagingAdventuresService } from 'src/app/services/managing-adventures.service';
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

  constructor(private clientProfileService: ClientProfileService, private adventureService : ManagingAdventuresService, public signupService: SignupOwnersService) { }

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
    this.adventureService.getAllAdventures().subscribe((data) => { this.availableAdventures = data; this.adventures = Array.from(data); this.backupAdventures = Array.from(data); })

  }
  findAvailable() {
    this.isAvailableFound = true;
    let parameters: ServiceAvailabilityParametersDTO = new ServiceAvailabilityParametersDTO();
    parameters.startDate = this.startDate;
    parameters.endDate = this.endDate;
    parameters.capacity = this.capacity;


    this.adventureService.findAvailableAdventures(parameters).subscribe((data) => { this.availableAdventures = data; this.adventures = Array.from(data); this.backupAdventures = Array.from(data); })
  }

  clear() {
    this.isAvailableFound = false;
    this.startDate = new Date();
    this.endDate = new Date();
    this.capacity = 2;
    this.adventureService.getAllAdventures().subscribe((data) => { this.availableAdventures = data; this.adventures = Array.from(data); this.backupAdventures = Array.from(data); })
    this.searchText = "";
    this.searchCriteria = "name";
    this.ratingFrom = 0;
    this.ratingTo = 5;
    this.location = "any";
    this.sortOrder = "asc";
    this.sortCriteria = "";
  }

  getAllAdventures() {
    this.adventureService.getAllAdventures().subscribe((data) => {
      this.adventures = data;
      this.backupAdventures = Array.from(data);
      this.adventures = [];
      for (let ae of this.availableAdventures) {
        for (let se of this.backupAdventures) {
          if (se.id == ae.id)
            this.adventures.push(se);
        }
      }
      this.backupAdventures = Array.from(this.adventures)
    })
  }

  search(){
    if (this.searchText === "")
      this.getAllAdventures();
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
    this.adventureService.getAdventuresByName(input).subscribe((data) => {
      this.adventures = data;
      this.backupAdventures = Array.from(data);
      this.adventures = [];
      for (let ae of this.availableAdventures) {
        for (let se of this.backupAdventures) {
          if (se.id == ae.id)
            this.adventures.push(se);
        }
      }
      this.backupAdventures = Array.from(this.adventures)
    })
  }
  searchByCity(input: string) {
    this.adventureService.getAdventuresByCity(input).subscribe((data) => {
      this.adventures = data;
      this.backupAdventures = Array.from(data);
      this.adventures = [];
      for (let ae of this.availableAdventures) {
        for (let se of this.backupAdventures) {
          if (se.id == ae.id)
            this.adventures.push(se);
        }
      }
      this.backupAdventures = Array.from(this.adventures)
    })
  }

  
}
