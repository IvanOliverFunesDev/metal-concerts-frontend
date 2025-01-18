import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home/home-page/home-page.component';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ConcertsPageComponent } from './components/concerts/concerts-page/concerts-page.component';
import { BandsPageComponent } from './components/bands/bands-page/bands-page.component';
import { ConcertDetailsPageComponent } from './components/concerts/concert-details-page/concert-details-page.component';


export const routes: Routes = [
    {
        path: '', component: MainComponent, children: [
            {
                path: '', component: HomePageComponent
            },
            {
                path: 'concerts-page', component: ConcertsPageComponent
            },
            {
                path: 'bands-page', component: BandsPageComponent
            },
            {
                path: 'concert/:id', component: ConcertDetailsPageComponent
            },
        ],
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'register', component: RegisterComponent
    }

];
