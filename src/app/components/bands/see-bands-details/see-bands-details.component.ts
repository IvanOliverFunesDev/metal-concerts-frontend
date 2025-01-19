import { Component } from '@angular/core';
import { Band } from '../../../interfaces/band';
import { ConcertsService } from '../../../services/concerts.service';
import { ActivatedRoute } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { Concert } from '../../../interfaces/concert';

@Component({
  selector: 'app-see-bands-details',
  imports: [NgIf, NgFor],
  templateUrl: './see-bands-details.component.html',
  styleUrl: './see-bands-details.component.css'
})
export class SeeBandsDetailsComponent {
  band: Band | null = null;
  concerts: Concert[] = [];
  constructor(private route: ActivatedRoute, private concertsService: ConcertsService) { }
  ngOnInit(): void {

    const bandId = this.route.snapshot.paramMap.get('id');

    if (bandId) {
      this.concertsService.getBandById(bandId).subscribe({
        next: (data) => { this.band = data },
        error: (err) => { console.error('Error cargando el concierto:', err); }
      })

    }
    if (bandId) {
      this.concertsService.getConcertsByBandId(bandId).subscribe({
        next: (data) => { this.concerts = data },
        error: (err) => { console.error('Error cargando el concierto:', err); }
      })

    }
  }
}
