import { Component, OnInit } from '@angular/core';
import { VeryBasicBand } from '../../../interfaces/band';
import { BandsService } from '../../../services/bands.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { BandsListComponent } from '../../bands/bands-list/bands-list.component';
import { SliderComponent } from '../../layout/slider/slider.component';

@Component({
  selector: 'app-subscriptions-page',
  imports: [BandsListComponent, SliderComponent],
  templateUrl: './subscriptions-page.component.html',
  standalone: true,
  styleUrl: './subscriptions-page.component.css'
})
export class SubscriptionsPageComponent implements OnInit {
  subscriptions: VeryBasicBand[] = [];

  constructor(public bandsService: BandsService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.bandsService.getUserSubscription().subscribe({
      next: (data) => {
        this.subscriptions = data;
      },
      error(err) {
        console.error('Error bands subscritas:', err.message)
      },
    })
  }
  logout(): void {
    this.authService.logout(); // Ahora es una función sin Observable
    this.router.navigateByUrl('/home'); // 🔥 Redirigir a Home tras cerrar sesión
  }
}
