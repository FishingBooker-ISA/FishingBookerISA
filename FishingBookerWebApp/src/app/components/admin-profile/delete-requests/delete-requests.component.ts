import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteAccountRequest } from 'src/app/model/delete-account-request';
import { RequestReview } from 'src/app/model/request-review';
import { AdminRequestsService } from 'src/app/services/admin-requests.service';

@Component({
  selector: 'app-delete-requests',
  templateUrl: './delete-requests.component.html',
  styleUrls: ['./delete-requests.component.css']
})
export class DeleteRequestsComponent implements OnInit {

  requests!: DeleteAccountRequest[];
  selectedRequest!: DeleteAccountRequest;
  denialReason!: string;

  constructor(public requestsService: AdminRequestsService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.requestsService.getAllDeleteAccountRequests().subscribe( res => this.requests = res);
  }

  selectRequest(request: DeleteAccountRequest){
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
    this.requestsService.sendDeleteAccountReview(review).subscribe(
      (data) => {
        this.requestsService.getAllDeleteAccountRequests().subscribe( res => this.requests = res);
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

  rejectRequest(){
    let review = new RequestReview();
    review = {
      id: this.selectedRequest.id,
      isDenied: true,
      denialReason: this.denialReason
    }
    this.requestsService.sendDeleteAccountReview(review).subscribe(
      (data) => {
        this.requestsService.getAllDeleteAccountRequests().subscribe( res => this.requests = res);
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
