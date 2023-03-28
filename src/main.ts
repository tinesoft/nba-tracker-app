import 'zone.js/dist/zone';

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { environment } from './environment/environment';
import { enableProdMode } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { HomeComponent } from './app/home/home.component';
import { teamResolver } from '@shared/resolvers/team.resolver';
import { appRoutes } from './app/app.routes';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideAnimations(),
    provideRouter(appRoutes)
  ],
});
