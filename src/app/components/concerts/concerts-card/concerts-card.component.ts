import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Concert } from '../../../interfaces/concert';

@Component({
  selector: 'app-concerts-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './concerts-card.component.html',
  styleUrl: './concerts-card.component.css'
})
export class ConcertsCardComponent {
  @Input() concert!: Concert;

  constructor(private router: Router) { }

  goToDetails() {
    this.router.navigate(['/concert', this.concert._id])
  }

}
