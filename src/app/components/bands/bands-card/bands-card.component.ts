import { Component, Input, OnInit } from '@angular/core';
import { BaseBand } from '../../../interfaces/band';
import { Router } from '@angular/router';
import { BandsService } from '../../../services/bands.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bands-card',
  imports: [],
  templateUrl: './bands-card.component.html',
  styleUrl: './bands-card.component.css'
})
export class BandsCardComponent implements OnInit {
  @Input() band!: BaseBand;

  constructor(public bandsService: BandsService, private router: Router) { }

  ngOnInit(): void {
    console.log(this.band);
  }

  goToDetails() {
    if (this.band.id) {
      this.router.navigate(['/band', this.band.id]);
    } else {
      console.error('Error: ID de la banda no disponible.');
    }
  }
}
