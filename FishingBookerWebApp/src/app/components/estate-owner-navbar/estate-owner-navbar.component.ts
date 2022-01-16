import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { createEstateDTO, Estate } from 'src/app/model/estate';
import { ManagingEstateService } from 'src/app/services/managing-estate.service';
import { SignupOwnersService } from 'src/app/services/signup-owners.service';
import { CreateEstateComponent, DetailsDialogModel } from '../create-estate/create-estate.component';

@Component({
  selector: 'app-estate-owner-navbar',
  templateUrl: './estate-owner-navbar.component.html',
  styleUrls: ['./estate-owner-navbar.component.css']
})
export class EstateOwnerNavbarComponent implements OnInit {

  collapsed = false;
  createModalResult!: boolean
  constructor(public dialog: MatDialog, public managingEstateService: ManagingEstateService, private router: Router,
    public signupService: SignupOwnersService) { }

  ngOnInit(): void {
  }

  confirmTransferCancelDialog(): void {
    const dialogData = new DetailsDialogModel(
      new createEstateDTO()
    );

    const dialogRef = this.dialog.open(CreateEstateComponent, {
      width: '900px',
      height: '700px',
      data: dialogData
    });
  }

  logOut() {
    this.signupService.logOut();
    this.router.navigate(['/login']);
  }
}
