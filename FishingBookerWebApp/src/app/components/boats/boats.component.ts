import { Component, OnInit } from '@angular/core';
import { DisplayEstateShortDTO } from 'src/app/model/estate';
import { ManagingEstateService } from 'src/app/services/managing-estate.service';

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

  constructor(private _estateService : ManagingEstateService) { }

  ngOnInit(): void {
    this.boats = this.getAllBoats();
  }

  getAllBoats(): DisplayEstateShortDTO[]{
    return this._estateService.getAllEstatesForClient();
  }

}
