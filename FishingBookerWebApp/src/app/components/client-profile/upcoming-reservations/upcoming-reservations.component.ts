import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upcoming-reservations',
  templateUrl: './upcoming-reservations.component.html',
  styleUrls: ['./upcoming-reservations.component.css']
})
export class UpcomingReservationsComponent implements OnInit {

  
  public sortOrder = "asc";
  public sortCriteria = "";
  constructor() { }

  ngOnInit(): void {
  }

}
