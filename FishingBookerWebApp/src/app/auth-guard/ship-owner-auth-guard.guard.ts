import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { SignupOwnersService } from '../services/signup-owners.service';

@Injectable({
  providedIn: 'root'
})
export class ShipOwnerAuthGuardGuard implements CanActivate {
  currentUser!: User

  constructor(
    private router: Router,
    private authenticationService: SignupOwnersService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('jwt') != null) {
      return new Promise(async (resolve, reject) => {
        this.authenticationService.getUser().toPromise().then((response) => {
          this.currentUser = response

          if (this.currentUser.role.name === 'ROLE_SHIP_OWNER') {
            resolve(true);
            return true;
          }
          else {
            this.router.navigate(['/login']);
            resolve(false);
            return false;
          }
        })
      })
    }
    this.router.navigate(['/login']);
    return false;
  }

}
