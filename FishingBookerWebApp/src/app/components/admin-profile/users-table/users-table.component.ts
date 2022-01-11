import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {
  filter!: string;

  constructor() { 

  }

  ngOnInit(): void {
    this.filter = "users";
  }

}
