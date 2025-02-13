import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {NgbAlert, NgbModule, NgbOffcanvas, NgbPopover} from '@ng-bootstrap/ng-bootstrap';
import {HttpClient, HttpHandler, provideHttpClient, withFetch} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withFetch()),
    provideRouter(routes),
    provideClientHydration(),
    importProvidersFrom(NgbModule,NgbPopover,NgbOffcanvas, HttpClient, CookieService,)

  ]
};
