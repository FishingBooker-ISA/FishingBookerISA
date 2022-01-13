import { Component, OnInit, ResolvedReflectiveFactory } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/model/login-user';
import { User } from 'src/app/model/user';
import { SignupOwnersService } from 'src/app/services/signup-owners.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email!: string;
  password!: string;
  hasErrors!: boolean;
  checkEmail = new FormControl('', [Validators.required, Validators.email]);
  checkPassword = new FormControl('', [Validators.required]);

  errorMessage = '';

  constructor(public signupOwnerService: SignupOwnersService, private router: Router) {
    this.hasErrors = true;
  }

  ngOnInit(): void { }

  public getErrorMessage() {
    if (this.checkEmail.hasError('required')) {
      return 'You must enter a value';
    }

    if (this.checkEmail.hasError('email')) {
      return 'Not a valid email';
    }

    return '';
  }

  public getPassErrorMessage() {
    if (this.checkPassword.hasError('required')) {
      return 'You must enter a value';
    }

    return '';
  }

  isButtonDisabled() {
    if (this.checkPassword.valid && this.checkEmail.valid) return false;

    return true;
  }

  public logIn() {
    let user: LoginUser = {
      username: this.email,
      password: this.password,
    };

    this.signupOwnerService.logIn(user).subscribe(
      (data) => {
        console.log('response received');
        this.signupOwnerService.getUser().subscribe((data) => this.redirect(this.signupOwnerService.currentUser));
      },
      (error) => {
        this.errorMessage = 'Invalid credentials';
        console.error('error caught in component');
      }
    );
  }

  redirect(user: User) {
    if (user.role.name === 'ROLE_CLIENT')
      this.router.navigate(['/']);
    else if (user.role.name === 'ROLE_ESTATE_OWNER')
      this.router.navigate(['/estateOwner/home']);
    else if (user.role.name === 'ROLE_SHIP_OWNER')
      this.router.navigate(['/']);
    else if (user.role.name === 'ROLE_ADMIN')
      this.router.navigate(['/admin/allComplaints']);
    else if (user.role.name === 'ROLE_INSTRUCTOR')
    this.router.navigate(['/instructor/home']);
  }

}
