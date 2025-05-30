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
import { SubscriptionsPageComponent } from './components/users/subscriptions-page/subscriptions-page.component';
import { BandPanel } from './components/bands/band-panel/band-panel.component';
import { AdminComponent } from './components/admin/admin.component';

import { adminOnlyGuard, authGuard, bandOnlyGuard, redirectPanelGuard } from './shared/guards/auth.guard';
export const routes: Routes = [
    {
        path: '', component: MainComponent, children: [
            {
                path: 'home', component: HomePageComponent, canMatch: [redirectPanelGuard]
            },
            {
                path: 'concerts-page', component: ConcertsPageComponent, canMatch: [redirectPanelGuard]
            },
            {
                path: 'bands-page', component: BandsPageComponent, canMatch: [redirectPanelGuard]
            },
            {
                path: 'concert/:id', component: ConcertDetailsPageComponent, canMatch: [redirectPanelGuard]
            },
            {
                path: 'band/:id', component: SeeBandsDetailsComponent, canMatch: [redirectPanelGuard]
            },
            {
                path: '', redirectTo: 'home', pathMatch: 'full'
            },
            {
                path: 'profile', component: ProfileComponent, canMatch: [redirectPanelGuard, authGuard]
            },
            {
                path: 'favorites-concerts', component: FavoritesConcertsPageComponent, canMatch: [redirectPanelGuard, authGuard]
            },
            {
                path: 'subcriptions', component: SubscriptionsPageComponent, canMatch: [redirectPanelGuard, authGuard]
            },
        ],
    },
    {
        path: 'band-panel', component: BandPanel, canMatch: [bandOnlyGuard]
    },
    {
        path: 'admin-panel', component: AdminComponent, canMatch: [adminOnlyGuard]
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
