import { Component, OnInit } from '@angular/core';
import { DisplayEstateShortDTO } from 'src/app/model/estate';
import { ManagingEstateService } from 'src/app/services/managing-estate.service';

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
  public sortCriteria = "";

  constructor(private _estateService : ManagingEstateService) { }

  ngOnInit(): void {
    this.adventures = this.getAllEstates();
  }

  getAllEstates(): DisplayEstateShortDTO[]{
    return this._estateService.getAllEstatesForClient();
  }
}
