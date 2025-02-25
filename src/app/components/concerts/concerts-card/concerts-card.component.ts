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

  addToFavorites() {
    if (!this.concert) return
    this.concertsService.addFavoriteConcert(this.concert.id).subscribe({
      next: (res) => {
        Swal.fire({
          icon: "success",
          title: "Added to Favorites",
          text: "This concert has been successfully added to your favorites.",
          confirmButtonText: "OK"
        });
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
  removeToFavorites() {
    if (!this.concert) return
    this.concertsService.removeFavoriteConcert(this.concert.id).subscribe({
      next: (res) => {
        Swal.fire({
          icon: "success",
          title: "Removed from Favorites",
          text: "This concert has been successfully removed from your favorites.",
          confirmButtonText: "OK"
        });
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
