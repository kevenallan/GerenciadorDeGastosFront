import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { LoadingInterceptor } from './core/interceptor/loading.interceptor';
import { ErrorInterceptor } from './core/interceptor/error.interceptor';
import { AuthRequestTokenInterceptor } from './core/interceptor/auth-request-token.interceptor';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideAnimations(),
        provideHttpClient(
            withInterceptors([
                LoadingInterceptor,
                ErrorInterceptor,
                AuthRequestTokenInterceptor
            ])
        ),
    ],
};
