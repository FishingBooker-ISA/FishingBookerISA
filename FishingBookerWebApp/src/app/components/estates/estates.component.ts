import { Component, OnInit } from '@angular/core';
import { DisplayServiceShortDTO } from 'src/app/model/display-service-short';
import { User } from 'src/app/model/user';
import { ManagingEstateService } from 'src/app/services/managing-estate.service';
import { SignupOwnersService } from 'src/app/services/signup-owners.service';

@Component({
  selector: 'app-estates',
  templateUrl: './estates.component.html',
  styleUrls: ['./estates.component.css']
})
export class EstatesComponent implements OnInit {
  public backupEstates: DisplayServiceShortDTO[] = [];
  public estates: DisplayServiceShortDTO[] = [];
  
  public searchText: string = "";
  public searchCriteria: string = "name";
  public ratingFrom = 0;
  public ratingTo = 5;
  public location: string = "";
  public sortOrder = "asc";
  public sortCriteria = "";
  currentUser!: User
  isClient:boolean = false;
  

  constructor(private _estateService : ManagingEstateService, public signupService: SignupOwnersService) { }

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
    this._estateService.getAllEstates().subscribe((data) => this.estates = data)
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
    this.location= "";
    this.sortOrder = "asc";
    this.sortCriteria = "";
    this.applyFilterAndSort();
  }
  applyFilterAndSort() {
  }
  searchByName(input: string) {
    this._estateService.getEstatesByName(input).subscribe((data) => this.estates = data)
  }
  searchByCity(input: string) {
    this._estateService.getEstatesByCity(input).subscribe((data) => this.estates = data)
  }

}
