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
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';
import { User } from '../model/user';
import { ClientRegistrationDTO } from '../model/client';
import { LogInData } from '../auth-guard/estate-owner-auth-guard';

@Injectable({
  providedIn: 'root',
})
export class SignupOwnersService {

  public errorMessage!: string;
  public currentUser!: User;
  private access_token = null
  public currentUserSubject!: BehaviorSubject<LogInData>;

  constructor(private http: HttpClient) {
    this.errorMessage = '';
    this.currentUserSubject = new BehaviorSubject<LogInData>(JSON.parse((localStorage.getItem('currentUser'))!));
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
          localStorage.setItem('currentUser', JSON.stringify(res));
          console.log(this.access_token);
        })
      );
  }

  public logOut(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('currentUser');
  }

  public sendSignupRequest(request: RegistrationRequest) {
    return this.http
      .post(`${environment.baseUrl}` + 'auth/signupForOwners', request)
  }

  public sendSignupClient(client: ClientRegistrationDTO) {
    this.http
      .post(`${environment.baseUrl}` + 'auth/signupForClients', client)
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

  verifyClient(c: string): Observable<boolean> {
    return this.http.put<any>(`${environment.baseUrl}` + 'api/client/verify/' + c, null);
  }

}
