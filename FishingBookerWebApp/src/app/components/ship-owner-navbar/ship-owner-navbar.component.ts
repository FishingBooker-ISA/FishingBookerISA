import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SignupOwnersService } from 'src/app/services/signup-owners.service';

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

  logOut() {
    this.signupService.logOut();
    this.router.navigate(['/login']);
  }
}
