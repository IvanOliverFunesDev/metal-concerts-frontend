import { Component, OnInit } from '@angular/core';
import { ConcertsService } from '../../../services/concerts.service';
import { FavoriteConcert } from '../../../interfaces/concert';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-favorites-concerts-page',
  imports: [NgFor],
  templateUrl: './favorites-concerts-page.component.html',
  styleUrl: './favorites-concerts-page.component.css'
})
export class FavoritesConcertsPageComponent implements OnInit {
  concertsFavorites: FavoriteConcert[] = [];

  constructor(private concertsService: ConcertsService) { }

  ngOnInit(): void {
    this.concertsService.getFavoriteConcerts().subscribe({
      next: (data) => {
        this.concertsFavorites = data;
      },
      error: (err) => console.error('Error conciertos favoritos:', err.message)
    })
  }
}
