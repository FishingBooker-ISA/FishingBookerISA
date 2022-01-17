import { HttpHeaders } from '@angular/common/http';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { User } from '../model/user';
import { SignupOwnersService } from '../services/signup-owners.service'

@Injectable()
export class EstateOwnerAuthGuard implements CanActivate {

    currentUser!: User
    loggedIn!: User

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

                    if (this.currentUser.role.name === 'ROLE_ESTATE_OWNER') {
                        console.log("IMA LI ME OVDJE");
                        resolve(true);
                        return true;
                    }
                    else {
                        console.log("IZBACIO SAM TE");
                        this.router.navigate(['/login']);
                        resolve(false);
                        return false;
                    }
                })
            })
        }
        console.log("OPET SAM OVDJE");
        this.router.navigate(['/login']);
        return false;
    }
}

export interface LogInData {
    accessToken: string,
    expiresIn: number
}