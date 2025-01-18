import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConcertsService } from '../../../services/concerts.service';
import e from 'express';
import { DatePipe, NgIf } from '@angular/common';
import { Concert } from '../../../interfaces/concert';

@Component({
  selector: 'app-concert-details-page',
  imports: [NgIf, DatePipe],
  templateUrl: './concert-details-page.component.html',
  styleUrl: './concert-details-page.component.css'
})
export class ConcertDetailsPageComponent implements OnInit {
  concert!: Concert | null;
  constructor(private route: ActivatedRoute, private concertsService: ConcertsService) { }
  ngOnInit(): void {

    const concertId = this.route.snapshot.paramMap.get('id');

    if (concertId) {
      this.concertsService.getConcertById(concertId).subscribe({
        next: (data) => { this.concert = data },
        error: (err) => { console.error('Error cargando el concierto:', err); }
      })

    }
  }
}
