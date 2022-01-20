import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoyaltyProgram } from 'src/app/model/loyalty-program';
import { LoyaltyProgramService } from 'src/app/services/loyalty-program.service';
import { SignupOwnersService } from 'src/app/services/signup-owners.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {
  loyaltyProgram! : LoyaltyProgram;
  originalProgram! : LoyaltyProgram;
  error! : string;
  collapsed = false;

  constructor(public service: LoyaltyProgramService, private router: Router,
    public signupService: SignupOwnersService) { }

  ngOnInit(): void {
    this.service.getLoyaltyProgram().subscribe( res => {this.loyaltyProgram = res; this.originalProgram = this.loyaltyProgram});
  }

  save(){
    if(this.loyaltyProgram.pointsForBronze < 0 || this.loyaltyProgram.pointsForSilver < 0
       || this.loyaltyProgram.pointsForGold < 0 || this.loyaltyProgram.pointsForUser < 0 || this.loyaltyProgram.pointsForOwner < 0)
      this.error = 'Points must be greater than 0.';
    else if (this.loyaltyProgram.percentForBronze < 0 || this.loyaltyProgram.percentForSilver < 0 || this.loyaltyProgram.percentForGold < 0 || this.loyaltyProgram.percentageForApp < 0)
      this.error = 'Percentage must be greater than 0.';
    else if (this.loyaltyProgram.percentForBronze > 100 || this.loyaltyProgram.percentForSilver > 100 || this.loyaltyProgram.percentForGold > 100 || this.loyaltyProgram.percentageForApp > 100)
      this.error = 'Percentage must be smaller than 100.';
    else{
      this.service.updateLoyaltyProgram(this.loyaltyProgram);
      window.location.reload();
    }
  }

  close(){
    this.service.getLoyaltyProgram().subscribe( res => {this.loyaltyProgram = res;});
  }

  logOut() {
    this.signupService.logOut();
    this.router.navigate(['/login']);
  }

}
