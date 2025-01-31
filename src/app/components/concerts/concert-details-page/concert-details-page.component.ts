import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConcertsService } from '../../../services/concerts.service';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Concert, RelatedConcert } from '../../../interfaces/concert';

@Component({
  selector: 'app-concert-details-page',
  imports: [NgIf, DatePipe, NgFor],
  templateUrl: './concert-details-page.component.html',
  styleUrl: './concert-details-page.component.css'
})
export class ConcertDetailsPageComponent implements OnInit {
  concert!: Concert | null;
  relatedConcerts: RelatedConcert[] = []
  constructor(private route: ActivatedRoute, private router: Router, private concertsService: ConcertsService) { }
  ngOnInit(): void {

    const concertId = this.route.snapshot.paramMap.get('id');

    if (concertId) {
      this.concertsService.getConcertById(concertId).subscribe({
        next: (data) => {
          if (data) {
            this.concert = data;
            this.relatedConcerts = data.relatedConcerts || [];
          } else {
            console.error('No data received');
          }
        },
        error: (err) => { console.error('Error cargando el concierto:', err); }
      })

    }
  }
  goToDetails() {
    if (this.concert?.band?.id) {
      this.router.navigate(['/band', this.concert.band.id]);
    } else {
      console.error('No se puede acceder a la banda o su ID');
    }
  }


}
