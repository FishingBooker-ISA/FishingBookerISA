import { Component, OnInit } from '@angular/core';
import { DisplayEstateShortDTO } from 'src/app/model/estate';
import { ManagingEstateService } from 'src/app/services/managing-estate.service';

@Component({
  selector: 'app-estates',
  templateUrl: './estates.component.html',
  styleUrls: ['./estates.component.css']
})
export class EstatesComponent implements OnInit {
  public estates: DisplayEstateShortDTO[] = [];
  
  public searchText: string = "";
  public searchCriteria: string = "name";
  public ratingFrom = '';
  public ratingTo = "";
  public location: string = "";
  public sortOrder = "asc";
  public sortCriteria = "";
  

  constructor(private _estateService : ManagingEstateService) { }

  ngOnInit(): void {
    this.estates = this.getAllEstates();
  }

  getAllEstates(): DisplayEstateShortDTO[]{
    return this._estateService.getAllEstatesForClient();
  }

}