import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { AdminRequestsService } from 'src/app/services/admin-requests.service';
import { SignupOwnersService } from 'src/app/services/signup-owners.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {
  userType!: string;
  allUsers!: User[];
  filteredUseres! : User[];
  selectedUser!: User;
  admin!: User;

  constructor(public service: AdminRequestsService, public auth: SignupOwnersService) { 

  }

  ngOnInit(): void {
    this.userType = "users";
    this.filteredUseres = [];
    this.service.getAllUsers().subscribe( res => {
      this.allUsers = res;
      for(let user of this.allUsers){
        if(user.role.name === 'ROLE_CLIENT')
          this.filteredUseres.push(user);
      }
    });
    this.auth.getUser().subscribe((data) => this.admin = data);
  }

  selectUser(user: User){
    this.selectedUser = user;
  }

  filterUsers(){
    this.filteredUseres = [];
    for(let user of this.allUsers){
      if(user.role.name === 'ROLE_ADMIN' && this.userType === 'admins')
        this.filteredUseres.push(user);
      if(user.role.name === 'ROLE_CLIENT' && this.userType === 'users')
        this.filteredUseres.push(user);
      if(user.role.name === 'ROLE_INSTRUCTOR' && this.userType === 'instructors')
        this.filteredUseres.push(user);
      if(user.role.name === 'ROLE_ESTATE_OWNER' && this.userType === 'estate')
        this.filteredUseres.push(user);
      if(user.role.name === 'ROLE_SHIP_OWNER' && this.userType === 'ship')
        this.filteredUseres.push(user);
    }
  }

  deleteUser(){
    this.service.deleteUser(this.selectedUser.id);
    window.location.reload();
  }

}
