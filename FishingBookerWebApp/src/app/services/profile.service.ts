import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DeletionRequestDTO } from '../model/account-request';
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
      phoneNumber: user.phoneNumber,
      shipOwnerRole: user.shipOwnerRole
    }

    this.http.put(`${environment.baseUrl}` + 'api/owners/updateProfile', dto, { observe: 'response', responseType: 'text' }).subscribe();
  }

  changePassword(dto: PasswordChangeDto) {
    this.http.put(`${environment.baseUrl}` + 'api/owners/changePassword', dto, { observe: 'response', responseType: 'text' }).subscribe();
  }

  changeClientPassword(dto: PasswordChangeDto) {
    this.http.put(`${environment.baseUrl}` + 'api/owners/changePassword', dto, { observe: 'response', responseType: 'text' });
  }

  deleteAccount(dto: DeletionRequestDTO) {
    return this.http.post(`${environment.baseUrl}` + 'api/owners/sendDeletionRequest', dto, { observe: 'response', responseType: 'text' });
  }

  getMonthlyReport() {
    return this.http.get(`${environment.baseUrl}` + 'api/bussiness/getMonthlyReport')
  }

  getYearlyReport() {
    return this.http.get(`${environment.baseUrl}` + 'api/bussiness/getYearlyReport')
  }

  getWeeklyReport() {
    return this.http.get(`${environment.baseUrl}` + 'api/bussiness/getWeeklyReport')
  }

  getIncomeForPeriod(startDate: Date, endDate: Date) {
    return this.http.post(`${environment.baseUrl}` + 'api/money/getOwnerMoneyForPeriod', { startDate, endDate }, { observe: 'response', responseType: 'text' });
  }

  getAverageRatings() {
    return this.http.get(`${environment.baseUrl}` + 'api/bussiness/getAverageMark');
  }
}
