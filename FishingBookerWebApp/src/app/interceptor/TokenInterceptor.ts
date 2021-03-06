import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpInterceptor,
    HttpEvent
} from '@angular/common/http';
import { Observable, } from 'rxjs';
import { SignupOwnersService } from '../services/signup-owners.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor() { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let currentToken = localStorage.getItem('jwt');
        if (currentToken !== undefined && currentToken !== null) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentToken}`
                }
            });
        }
        return next.handle(request);
    }
}