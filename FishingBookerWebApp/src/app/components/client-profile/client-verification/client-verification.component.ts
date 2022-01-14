import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SignupOwnersService } from 'src/app/services/signup-owners.service';

@Component({
  selector: 'app-client-verification',
  templateUrl: './client-verification.component.html',
  styleUrls: ['./client-verification.component.css']
})
export class ClientVerificationComponent implements OnInit {
  isSuccess!: boolean;
  code!: string;
  
  constructor(private _route: ActivatedRoute, private _signupService: SignupOwnersService) { }

  ngOnInit(): void {
    let code = this._route.snapshot.paramMap.get('code');
    if (code != null){
      this.code = code;
    }
    this._signupService.verifyClient(this.code).subscribe( res => { this.isSuccess = res;});
  }

}
