import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/model/booking-service';
import { ServiceType } from 'src/app/model/estate';
import { AdminRequestsService } from 'src/app/services/admin-requests.service';

@Component({
  selector: 'app-services-table',
  templateUrl: './services-table.component.html',
  styleUrls: ['./services-table.component.css']
})
export class ServicesTableComponent implements OnInit {
  serviceType!: string;
  allServices!: BookingService[];
  filteredServices! : BookingService[];
  selectedService!: BookingService;

  constructor(public service: AdminRequestsService) { 

  }

  ngOnInit(): void {
    this.serviceType = "estates";
    this.filteredServices = [];
    this.service.getAllServices().subscribe( res => {
      this.allServices = res;
      for(let service of res){
        if(service.type === 0)
          this.filteredServices.push(service);
      }
    });
  }

  selectService(service: BookingService){
    this.selectedService = service;
  }

  filterServices(){
    this.filteredServices = [];
    for(let service of this.allServices){
      if(service.type === 0 && this.serviceType === 'estates')
        this.filteredServices.push(service);
      if(service.type === 1 && this.serviceType === 'boats')
        this.filteredServices.push(service);
      if(service.type === 2 && this.serviceType === 'adventures')
        this.filteredServices.push(service);
    }
  }

  deleteService(){
    this.service.deleteUser(this.selectedService.id);
    window.location.reload();
  }

}
