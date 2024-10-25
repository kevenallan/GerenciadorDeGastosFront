import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertService } from '../service/alert.service';
import { AuthService } from '../service/auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router,
        private alertService: AlertService
    ) {}

    canActivate():
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        if (this.authService.isUserLoggedIn()) {
            return true;
        } else {
            this.alertService.showWarningAlert('Sua sessão expirou');
            this.authService.logout();
            this.router.navigate(['/login']);
            return false;
        }
    }
}
