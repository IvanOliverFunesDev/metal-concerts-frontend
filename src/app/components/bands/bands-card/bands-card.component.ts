import { Component, Input, OnInit } from '@angular/core';
import { Band } from '../../../interfaces/band';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bands-card',
  imports: [],
  templateUrl: './bands-card.component.html',
  styleUrl: './bands-card.component.css'
})
export class BandsCardComponent implements OnInit {
  @Input() band!: Band;

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log(this.band);

  }

  goToDetails() {
    if (this.band?.id) {
      this.router.navigate(['/band', this.band.id]);
    } else {
      console.error('Error: ID de la banda no disponible.');
    }
  }
}
