import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Estate } from 'src/app/model/estate';
import { ManagingEstateService } from 'src/app/services/managing-estate.service';

@Component({
  selector: 'app-estate-owner-homepage',
  templateUrl: './estate-owner-homepage.component.html',
  styleUrls: ['./estate-owner-homepage.component.css']
})
export class EstateOwnerHomepageComponent implements OnInit {

  ownersEstates!: Estate[];
  searchEstates!: string;
  constructor(public managingEstateService: ManagingEstateService, private router: Router) { }

  ngOnInit(): void {
    this.getEstatesForOwner()
  }

  getEstatesForOwner() {
    this.managingEstateService.getAllEstatesForOwner().subscribe((data) => this.ownersEstates = data)
  }

  openEstate(estateId: number) {
    this.router.navigate(['/estate', estateId]);
  }

  searchEstatesByName() {
    if (this.searchEstates == '') {
      this.managingEstateService
        .getAllEstatesForOwner()
        .toPromise()
        .then((res) => (this.ownersEstates = res as Estate[]));
    } else {
      this.managingEstateService
        .getEstateByName(this.searchEstates)
        .toPromise()
        .then((res) => (this.ownersEstates = res as Estate[]));
    }
  }

}
