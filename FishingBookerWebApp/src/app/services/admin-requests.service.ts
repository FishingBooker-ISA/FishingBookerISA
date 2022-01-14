import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AccountRequest } from '../model/account-request';
import { RequestReview } from '../model/request-review';
import { DeleteAccountRequest } from '../model/delete-account-request';
import { NewAdminDTO, User } from '../model/user';


@Injectable({
  providedIn: 'root'
})
export class AdminRequestsService {
  public errorMessage!: string;


  constructor(private http: HttpClient) { }
  
  public getAllAccountRequests() : Observable<AccountRequest[]> {
    return this.http.get<AccountRequest[]>(`${environment.baseUrl}` + 'api/accounts/getAllAccountRequests');
  }

  public getAllDeleteAccountRequests() : Observable<DeleteAccountRequest[]> {
    return this.http.get<DeleteAccountRequest[]>(`${environment.baseUrl}` + 'api/accounts/getAllDeleteAccountRequests');
  }

  public sendAccountReview(review : RequestReview){
    console.log(localStorage.getItem('jwt'));
    return this.http
      .post(
        `${environment.baseUrl}` + 'api/accounts/reviewRequest',
       review
      )
      .subscribe((response) => {
        console.log('response received');
      },
      (error) => {
        console.error('error caught in component');
      });
  }

  public sendDeleteAccountReview(review : RequestReview){
    console.log(localStorage.getItem('jwt'));
    return this.http
      .post(
        `${environment.baseUrl}` + 'api/accounts/reviewDeleteRequest',
       review
      )
      .subscribe((response) => {
        console.log('response received');
      },
      (error) => {
        console.error('error caught in component');
      });
  }

  public getAllUsers() : Observable<User[]> {
    return this.http.get<User[]>(`${environment.baseUrl}` + 'api/users/getAllUsers');
  }

  deleteUser(id: number) {
    return this.http
      .post(
        `${environment.baseUrl}` + 'api/users/deleteUser',
       id
      )
      .subscribe((response) => {
        console.log('response received');
      },
      (error) => {
        console.error('error caught in component');
      });
  }

  public addNewAdmin(request: NewAdminDTO) {
    this.http
      .post(`${environment.baseUrl}` + 'auth/addAdmin', request)
      .subscribe(
        (response) => {
          console.log('response received');
        },
        (error) => {
          this.errorMessage = 'Account with this email already exists!';
          console.error('error caught in component');
        }
      );
  }
}
