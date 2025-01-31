import { Component } from '@angular/core';
import { BandPublic } from '../../../interfaces/band-profil-public';
import { ConcertsService } from '../../../services/concerts.service';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import { ConcertsListComponent } from "../../concerts/concerts-list/concerts-list.component";
import { BandsService } from '../../../services/bands.service';

@Component({
  selector: 'app-see-bands-details',
  imports: [NgIf, ConcertsListComponent],
  templateUrl: './see-bands-details.component.html',
  styleUrl: './see-bands-details.component.css'
})
export class SeeBandsDetailsComponent {
  band: BandPublic | null = null;

  constructor(private route: ActivatedRoute, public bandsService: BandsService) { }

  ngOnInit(): void {
    const bandId = this.route.snapshot.paramMap.get('id');

    if (bandId) {
      this.bandsService.getBandById(bandId).subscribe({
        next: (data) => this.band = data,
        error: (err) => console.error('Error cargando la banda:', err)
      });
    }
  }
}
