import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ShipDTO } from 'src/app/model/ship';
import { SignupOwnersService } from 'src/app/services/signup-owners.service';
import { CreateShipComponent, CreateShipDialog } from '../ship-profile/create-ship/create-ship.component';

@Component({
  selector: 'app-ship-owner-navbar',
  templateUrl: './ship-owner-navbar.component.html',
  styleUrls: ['./ship-owner-navbar.component.css']
})
export class ShipOwnerNavbarComponent implements OnInit {

  collapsed = false;
  createModalResult!: boolean
  constructor(public dialog: MatDialog, private router: Router,
    public signupService: SignupOwnersService) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogData = new CreateShipDialog(
      new ShipDTO()
    );

    const dialogRef = this.dialog.open(CreateShipComponent, {
      width: '1300px',
      height: '650px',
      data: dialogData
    });
  }

  logOut() {
    this.signupService.logOut();
    this.router.navigate(['/login']);
  }
}
