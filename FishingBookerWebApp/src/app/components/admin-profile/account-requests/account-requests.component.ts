import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountRequest } from 'src/app/model/account-request';
import { RequestReview } from 'src/app/model/request-review';
import { AdminRequestsService } from 'src/app/services/admin-requests.service';

@Component({
  selector: 'app-account-requests',
  templateUrl: './account-requests.component.html',
  styleUrls: ['./account-requests.component.css']
})
export class AccountRequestsComponent implements OnInit {

  requests!: AccountRequest[];
  selectedRequest!: AccountRequest;
  denialReason!: string;

  constructor(public requestsService: AdminRequestsService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.requestsService.getAllAccountRequests().subscribe( res => this.requests = res);
  }

  selectRequest(request: AccountRequest){
    this.selectedRequest = request;
    console.log(request);
  }

  approveRequest(){
    let review = new RequestReview();
    review = {
      id: this.selectedRequest.id,
      isDenied: false,
      denialReason: ""
    }
    this.requestsService.sendAccountReview(review).subscribe(
      (data) => {
        this.requestsService.getAllAccountRequests().subscribe( res => this.requests = res);
        this._snackBar.open('Review submitted', 'Dissmiss', {
          duration: 3000
        });


        setTimeout(() => {
        }, 1000);
      },
      (error) => {
        this._snackBar.open('This complaint has already been reviewed', 'Dissmiss', {
          duration: 3000
        });
      });;;
    window.location.reload();
  }

  rejectRequest(){
    let review = new RequestReview();
    review = {
      id: this.selectedRequest.id,
      isDenied: true,
      denialReason: this.denialReason
    }
    this.requestsService.sendAccountReview(review).subscribe(
      (data) => {
        this.requestsService.getAllAccountRequests().subscribe( res => this.requests = res);
        this._snackBar.open('Review submitted', 'Dissmiss', {
          duration: 3000
        });


        setTimeout(() => {
        }, 1000);
      },
      (error) => {
        this._snackBar.open('This request has already been reviewed', 'Dissmiss', {
          duration: 3000
        });
      });;;
  }
}
