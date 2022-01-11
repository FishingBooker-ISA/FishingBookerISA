import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { RegistrationRequest } from '../model/registration-request';
import { LoginUser } from '../model/login-user';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class SignupOwnersService {
  public errorMessage!: string;
  public currentUser!: User;
  private access_token = null

  constructor(private http: HttpClient) {
    this.errorMessage = '';
  }

  public logIn(user: LoginUser): Observable<any> {
    return this.http
      .post(`${environment.baseUrl}` + 'auth/login', JSON.stringify(user), {
        headers: new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }),
      })
      .pipe(
        map((res: any) => {
          console.log('Login success');
          this.access_token = res.accessToken;
          localStorage.setItem('jwt', res.accessToken);
          console.log(res.accessToken);
        })
      );
  }

  public sendSignupRequest(request: RegistrationRequest) {
    this.http
      .post(`${environment.baseUrl}` + 'auth/signupForOwners', request)
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

  public getUser() {
    return this.http.get(`${environment.baseUrl}` + 'api/users/whoami').pipe(
      map((user: any) => {
        this.currentUser = user;
        return user;
      })
    );
  }

  tokenIsPresent() {
    return this.access_token != undefined && this.access_token != null;
  }

  getToken() {
    return this.access_token;
  }

}
