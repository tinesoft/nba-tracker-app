import { Routes } from '@angular/router';
import { teamResolver } from '@shared/resolvers/team.resolver';
import { HomeComponent } from './home/home.component';

export const appRoutes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'results/:id',
        loadComponent: () => import('@teams/team-games-details/team-games-details.component'),
        resolve: {
            team: teamResolver
        }
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'home'
    },
];