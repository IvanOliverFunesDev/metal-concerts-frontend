import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-slider',
  standalone: true,
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css',
  imports: []
})
export class SliderComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/home');
  }

  goToFavorites(): void {
    this.router.navigateByUrl('/favorites-concerts');
  }

  goToSubscriptions(): void {
    this.router.navigateByUrl('/subscriptions');
  }
  goToProfile(): void {
    this.router.navigateByUrl('/profile');
  }
  goToForgotPassword(): void {
    this.router.navigateByUrl('/forgot-password');
  }
}
