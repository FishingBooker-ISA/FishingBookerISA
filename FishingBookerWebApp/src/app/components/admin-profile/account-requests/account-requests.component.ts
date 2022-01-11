import { Component, OnInit } from '@angular/core';
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

  constructor(public requestsService: AdminRequestsService) { }

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
    this.requestsService.sendAccountReview(review);
    window.location.reload();
  }

  rejectRequest(){
    let review = new RequestReview();
    review = {
      id: this.selectedRequest.id,
      isDenied: true,
      denialReason: this.denialReason
    }
    this.requestsService.sendAccountReview(review);
    window.location.reload();
  }
}
