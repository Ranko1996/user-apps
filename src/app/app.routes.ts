import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ApplicationsComponent } from './applications/applications.component';
import { UsersAppsComponent } from './users-apps/users-apps.component';

export const routes: Routes = [
    {
        path: 'users',
        component: HomeComponent
    },
    {
        path: 'apps',
        component: ApplicationsComponent
    },
    {
        path: '',
        component: UsersAppsComponent
    }
];
