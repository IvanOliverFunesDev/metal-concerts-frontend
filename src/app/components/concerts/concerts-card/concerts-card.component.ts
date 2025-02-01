import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Concert } from '../../../interfaces/concert';

@Component({
  selector: 'app-concerts-card',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './concerts-card.component.html',
  styleUrl: './concerts-card.component.css'
})
export class ConcertsCardComponent {
  @Input() concert!: Concert;

  constructor(private router: Router) { }
  goToDetails() {
    if (!this.concert || !this.concert.id) {
      console.error('El objeto concert o su ID es undefined o null');
      return;
    }
    this.router.navigate(['/concert', this.concert.id]);
    console.log(this.concert.id);
  }
}
