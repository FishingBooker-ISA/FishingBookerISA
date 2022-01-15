import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminRequestsService } from 'src/app/services/admin-requests.service';

@Component({
  selector: 'app-new-admin-login',
  templateUrl: './new-admin-login.component.html',
  styleUrls: ['./new-admin-login.component.css']
})
export class NewAdminLoginComponent implements OnInit {
  newPassword! : string;
  repeatedPassword! : string;
  error! : string;

  constructor(private router: Router, public service: AdminRequestsService) { }

  ngOnInit(): void {
  }

  changePassword(){
    if(this.newPassword !== this.repeatedPassword)
      this.error = "Passwords do not match.";
    else{
      this.service.changePassword(this.newPassword);
      this.router.navigate(['/admin/allComplaints']);
    }
  }
}
