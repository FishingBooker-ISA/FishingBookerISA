import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignupOwnersService } from 'src/app/services/signup-owners.service';

@Component({
  selector: 'app-client-navbar',
  templateUrl: './client-navbar.component.html',
  styleUrls: ['./client-navbar.component.css']
})
export class ClientNavbarComponent implements OnInit {

  constructor(private _router: Router,private _signupService: SignupOwnersService) { }

  ngOnInit(): void {
  }

  logOut(): void{
    this._signupService.logOut();
    this._router.navigate(['/login']);
  }

}
