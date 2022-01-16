import { Component, OnInit } from '@angular/core';
import { DisplayEstateShortDTO } from 'src/app/model/estate';
import { SubscriptionDTO } from 'src/app/model/subscription';
import { User } from 'src/app/model/user';
import { ManagingEstateService } from 'src/app/services/managing-estate.service';
import { SignupOwnersService } from 'src/app/services/signup-owners.service';
import { SubscriptionService } from 'src/app/services/subscription.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent implements OnInit {

  public subscriptions: SubscriptionDTO[] = [];
  
  currentUser!: User
  

  constructor(private  subscriptionService: SubscriptionService, private signupService: SignupOwnersService) { }

  ngOnInit(): void {
    this.signupService.getUser().subscribe((data) => {
      this.currentUser = data;
      this.getAllSubscriptions();
    });
  }

  unsubscribe(id:number, serviceId:number){
    this.subscriptionService.unsubscribe(this.currentUser.id, serviceId);
    for(let i = 0; i < this.subscriptions.length; i++){
      if(this.subscriptions[i].id === id)
      this.subscriptions.splice(i, 1);
    }
  }

  getAllSubscriptions() {
    this.subscriptionService.getAllSubscriptionsForClient(this.currentUser.id).subscribe((data) => {this.subscriptions = data;})
  }

}
