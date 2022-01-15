import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PasswordChangeDto } from '../model/password-change-dto';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(public http: HttpClient) { }

  editUserProfile(user: User) {
    let dto = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      street: user.address.street,
      number: user.address.number,
      city: user.address.city,
      country: user.address.country,
      postcode: user.address.postcode,
      phoneNumber: user.phoneNumber
    }

    this.http.put(`${environment.baseUrl}` + 'api/owners/updateProfile', dto).subscribe();
  }

  changePassword(dto: PasswordChangeDto) {
    this.http.put(`${environment.baseUrl}` + 'api/owners/changePassword', dto).subscribe();
  }
}