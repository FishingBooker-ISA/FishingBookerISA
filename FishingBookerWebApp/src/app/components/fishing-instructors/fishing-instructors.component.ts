import { Component, OnInit } from '@angular/core';
import { DisplayEstateShortDTO } from 'src/app/model/estate';
import { User } from 'src/app/model/user';
import { ManagingEstateService } from 'src/app/services/managing-estate.service';
import { SignupOwnersService } from 'src/app/services/signup-owners.service';

@Component({
  selector: 'app-fishing-instructors',
  templateUrl: './fishing-instructors.component.html',
  styleUrls: ['./fishing-instructors.component.css']
})
export class FishingInstructorsComponent implements OnInit {
  public adventures: DisplayEstateShortDTO[] = [];
  
  public searchText: string = "";
  public searchCriteria: string = "name";
  public ratingFrom = '';
  public ratingTo = "";
  public location: string = "";
  public sortOrder = "asc";
  public sortCriteria = "";currentUser!: User
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
    this.adventures = this.getAllEstates();
  }

  getAllEstates(): DisplayEstateShortDTO[]{
    return this._estateService.getAllEstatesForClient();
  }
}
