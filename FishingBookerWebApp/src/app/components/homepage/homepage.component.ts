import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { SignupOwnersService } from 'src/app/services/signup-owners.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  currentUser!: User
  isClient:boolean = false;

  constructor(public signupService: SignupOwnersService) { }

  ngOnInit(): void {
    this.signupService.getUser().subscribe((data) => {
      this.currentUser = data;
      if(this.currentUser.role.name == "ROLE_CLIENT"){
        this.isClient = true;
      }

    });
    this.currentUser = this.signupService.currentUser;
  }
}
