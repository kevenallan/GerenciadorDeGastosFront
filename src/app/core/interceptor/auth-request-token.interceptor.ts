import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';

export const AuthRequestTokenInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const token = authService.getAuthorizationToken();

    const requestClone = req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`,
        },
    });
    return next(requestClone);
};
