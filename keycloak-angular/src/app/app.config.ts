import {APP_INITIALIZER, ApplicationConfig, Provider} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { environment } from '../environments/environment';

import {KeycloakBearerInterceptor, KeycloakService} from "keycloak-angular";
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";

function initializeKeycloak(keycloak: KeycloakService) {
 return () =>
   keycloak.init({
     config: {
       url: environment.keycloak.issuer, // Issuer URL (without auth in new version)
       realm: environment.keycloak.realm, // Realm from Keycloak
       clientId: environment.keycloak.clientId // Client ID for the application
     },
     initOptions: {
       onLoad: 'check-sso',
       silentCheckSsoRedirectUri:
         window.location.origin + '/assets/silent-check-sso.html' // URI for silent SSO checks
     },
     // Add Authorization Bearer Token to Http Calls without custom code
     enableBearerInterceptor: true,
     bearerPrefix: 'Bearer',
     // URLs exclude from bearer token http interceptor, default is empty
     //bearerExcludedUrls: []
   });
}

const KeycloakBearerInterceptorProvider: Provider = {
 provide: HTTP_INTERCEPTORS,
 useClass: KeycloakBearerInterceptor,
 multi: true
};

const KeycloakInitializerProvider: Provider = {
 provide: APP_INITIALIZER,
 useFactory: initializeKeycloak,
 multi: true,
 deps: [KeycloakService]
}

export const appConfig: ApplicationConfig = {
 providers: [
   provideHttpClient(withInterceptorsFromDi()), // HttpClient with interceptors
   KeycloakInitializerProvider, // Initializes Keycloak
   KeycloakBearerInterceptorProvider, // Bearer Interceptor
   KeycloakService, // Service for Keycloak
   provideRouter(routes) // Routing for the application
 ]
};
