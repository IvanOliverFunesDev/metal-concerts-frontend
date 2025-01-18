import { Component, Input } from '@angular/core';
import { Band } from '../../../interfaces/band';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bands-card',
  imports: [],
  templateUrl: './bands-card.component.html',
  styleUrl: './bands-card.component.css'
})
export class BandsCardComponent {
  @Input() band!: Band;

  constructor(private router: Router) { }
  goToDetaisl() {
    this.router.navigate(['/band', this.band._id])
  }
}
