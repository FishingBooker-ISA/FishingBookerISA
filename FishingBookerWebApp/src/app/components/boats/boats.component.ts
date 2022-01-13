import { Component, OnInit } from '@angular/core';
import { DisplayEstateShortDTO } from 'src/app/model/estate';
import { User } from 'src/app/model/user';
import { ManagingEstateService } from 'src/app/services/managing-estate.service';
import { SignupOwnersService } from 'src/app/services/signup-owners.service';

@Component({
  selector: 'app-boats',
  templateUrl: './boats.component.html',
  styleUrls: ['./boats.component.css']
})
export class BoatsComponent implements OnInit {
  public boats: DisplayEstateShortDTO[] = [];
  
  public searchText: string = "";
  public searchCriteria: string = "name";
  public ratingFrom = '';
  public ratingTo = "";
  public location: string = "";
  public sortOrder = "asc";
  public sortCriteria = "";
  currentUser!: User
  isClient:boolean = false;


  constructor(private _estateService : ManagingEstateService, public signupService: SignupOwnersService) { }

  ngOnInit(): void {
    this.boats = this.getAllBoats();
    this.signupService.getUser().subscribe((data) => {
      this.currentUser = data;
      if(this.currentUser.role.name == "ROLE_CLIENT"){
        this.isClient = true;
      }

    });
    this.currentUser = this.signupService.currentUser;
  }

  getAllBoats(): DisplayEstateShortDTO[]{
    return this._estateService.getAllEstatesForClient();
  }

}
