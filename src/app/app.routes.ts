import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home/home-page/home-page.component';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/registerUser/register.component';
import { ConcertsPageComponent } from './components/concerts/concerts-page/concerts-page.component';
import { BandsPageComponent } from './components/bands/bands-page/bands-page.component';
import { ConcertDetailsPageComponent } from './components/concerts/concert-details-page/concert-details-page.component';
import { SeeBandsDetailsComponent } from './components/bands/see-bands-details/see-bands-details.component';
import { RegisterBandComponent } from './components/auth/register-band/register-band.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { ProfileComponent } from './components/users/profile/profile.component';
import { FavoritesConcertsPageComponent } from './components/users/favorites-concerts-page/favorites-concerts-page.component';


export const routes: Routes = [
    {
        path: '', component: MainComponent, children: [
            {
                path: 'home', component: HomePageComponent
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
            {
                path: 'band/:id', component: SeeBandsDetailsComponent
            },
            {
                path: '', redirectTo: 'home', pathMatch: 'full'
            },
            {
                path: 'profile', component: ProfileComponent
            },
            {
                path: 'favorites-concerts', component: FavoritesConcertsPageComponent
            },
        ],
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'register', component: RegisterComponent
    },
    {
        path: 'registerBand', component: RegisterBandComponent
    },
    {
        path: 'forgot-password', component: ForgotPasswordComponent
    },


];
