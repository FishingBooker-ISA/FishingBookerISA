import { Component, OnInit } from '@angular/core';
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

  constructor(public requestsService: AdminRequestsService) { }

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
    this.requestsService.sendDeleteAccountReview(review);
    window.location.reload();
  }

  rejectRequest(){
    let review = new RequestReview();
    review = {
      id: this.selectedRequest.id,
      isDenied: true,
      denialReason: this.denialReason
    }
    this.requestsService.sendDeleteAccountReview(review);
    window.location.reload();
  }

}
