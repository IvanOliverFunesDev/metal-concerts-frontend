import { Component, OnInit } from '@angular/core';
import { ConcertsService } from '../../../services/concerts.service';
import { FavoriteConcert } from '../../../interfaces/concert';
import { NgFor, NgIf } from '@angular/common';
import { ConcertsListComponent } from "../../concerts/concerts-list/concerts-list.component";
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-favorites-concerts-page',
  imports: [ConcertsListComponent, RouterLink],
  templateUrl: './favorites-concerts-page.component.html',
  styleUrl: './favorites-concerts-page.component.css'
})
export class FavoritesConcertsPageComponent implements OnInit {
  concertsFavorites: FavoriteConcert[] = [];

  constructor(public concertsService: ConcertsService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.concertsService.getFavoriteConcerts().subscribe({
      next: (data) => {
        this.concertsFavorites = data;
      },
      error: (err) => console.error('Error conciertos favoritos:', err.message)
    })
  }
  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigateByUrl('/home');
      },
      error: (err) => console.error('Error al cerrar sesión:', err)
    });
  }
}
