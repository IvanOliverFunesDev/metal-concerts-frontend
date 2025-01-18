import { Component } from '@angular/core';
import { Band } from '../../../interfaces/band';
import { ConcertsService } from '../../../services/concerts.service';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-see-bands-details',
  imports: [NgIf],
  templateUrl: './see-bands-details.component.html',
  styleUrl: './see-bands-details.component.css'
})
export class SeeBandsDetailsComponent {
  band: Band | null = null;
  constructor(private route: ActivatedRoute, private concertsService: ConcertsService) { }
  ngOnInit(): void {

    const bandId = this.route.snapshot.paramMap.get('id');

    if (bandId) {
      this.concertsService.getBandById(bandId).subscribe({
        next: (data) => { this.band = data },
        error: (err) => { console.error('Error cargando el concierto:', err); }
      })

    }
  }
}
