import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { LoadingInterceptor } from './core/interceptor/loading.interceptor';
import { ErrorInterceptor } from './core/interceptor/error.interceptor';
import { AuthRequestTokenInterceptor } from './core/interceptor/auth-request-token.interceptor';
import { LoadingService } from './core/service/loading.service';
import { FirebaseService } from './core/service/firebase.service';
import { firstValueFrom } from 'rxjs';

import { FirebaseApp, provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { provideAuth } from '@angular/fire/auth';
import { getAuth } from 'firebase/auth';

let firebaseConfig: any = null;

function loadFirebaseConfig(
    configService: FirebaseService,
    loadingService: LoadingService
) {
    loadingService.exibirTelaLoadingInitializeFirebase();
    return () =>
        firstValueFrom(configService.getConfig())
            .then((config) => {
                firebaseConfig = config;
                loadingService.ocultarTelaLoadingInitializeFirebase();
            })
            .catch(() => {
                loadingService.ocultarTelaLoadingInitializeFirebase();
            });
}

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideAnimations(),
        provideHttpClient(
            withInterceptors([
                LoadingInterceptor,
                ErrorInterceptor,
                AuthRequestTokenInterceptor,
            ])
        ),
        {
            provide: APP_INITIALIZER,
            useFactory: loadFirebaseConfig,
            deps: [FirebaseService, LoadingService],
            multi: true
        },
        provideFirebaseApp(() => {
            if (!firebaseConfig) {
                throw new Error('Firebase config not loaded');
            }
            return initializeApp(firebaseConfig) as FirebaseApp;
        }),
        provideAuth(() => getAuth())
    ],
};
