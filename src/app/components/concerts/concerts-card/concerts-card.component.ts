import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Concert } from '../../../interfaces/concert';
import { ConcertsService } from '../../../services/concerts.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-concerts-card',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './concerts-card.component.html',
  styleUrl: './concerts-card.component.css'
})
export class ConcertsCardComponent {
  @Input() concert!: Concert;

  constructor(private router: Router, private concertsService: ConcertsService) { }

  goToDetails() {
    if (!this.concert || !this.concert.id) {
      console.error('El objeto concert o su ID es undefined o null');
      return;
    }
    this.router.navigate(['/concert', this.concert.id]);
    console.log(this.concert.id);
  }

  toggleFavorite(concert: Concert): void {
    if (concert.isFavorite) {
      this.removeFromFavorites(concert);
    } else {
      this.addToFavorites(concert);
    }
  }

  addToFavorites(concert: Concert) {
    if (!this.concert) return;
    this.concertsService.addFavoriteConcert(this.concert.id).subscribe({
      next: (res) => {
        concert.isFavorite = true; // Cambia el estado en el frontend
      },
      error: (error) => {
        if (error.message === 'Unauthorized') {
          Swal.fire({
            icon: "error",
            title: "You must be logged in",
            text: "To add a concert to your favorites, please log in.",
            showCancelButton: true,
            confirmButtonText: "Login",
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/login']);
            }
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops! Something went wrong",
            text: error.message,
            confirmButtonText: "Got it"
          });
        }
      }
    });
  }

  removeFromFavorites(concert: Concert) {
    if (!this.concert) return
    this.concertsService.removeFavoriteConcert(this.concert.id).subscribe({
      next: (res) => {
        concert.isFavorite = false;
      },
      error: (err) => {
        Swal.fire({
          icon: "error",
          title: "Oops! Something went wrong",
          text: err.message,
          confirmButtonText: "Got it"
        });
      }
    });
  }
}
