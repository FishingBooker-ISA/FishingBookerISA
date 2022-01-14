import { Component, OnInit } from '@angular/core';
import { LoyaltyProgram } from 'src/app/model/loyalty-program';
import { LoyaltyProgramService } from 'src/app/services/loyalty-program.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {
  loyaltyProgram! : LoyaltyProgram;
  originalProgram! : LoyaltyProgram;
  error! : string;

  constructor(public service: LoyaltyProgramService) { }

  ngOnInit(): void {
    this.service.getLoyaltyProgram().subscribe( res => {this.loyaltyProgram = res; this.originalProgram = this.loyaltyProgram});
  }

  save(){
    if(this.loyaltyProgram.pointsForBronze < 0 || this.loyaltyProgram.pointsForSilver < 0 || this.loyaltyProgram.pointsForGold < 0)
      this.error = 'Points must be greater than 0.';
    else if (this.loyaltyProgram.percentForBronze < 0 || this.loyaltyProgram.percentForSilver < 0|| this.loyaltyProgram.percentForGold < 0)
      this.error = 'Percentage must be greater than 0.';
    else if (this.loyaltyProgram.percentForBronze > 100 || this.loyaltyProgram.percentForSilver > 100 || this.loyaltyProgram.percentForGold > 100)
      this.error = 'Percentage must be smaller than 100.';
    else{
      this.service.updateLoyaltyProgram(this.loyaltyProgram);
      window.location.reload();
    }
  }

  close(){
    this.service.getLoyaltyProgram().subscribe( res => {this.loyaltyProgram = res;});
  }

}
