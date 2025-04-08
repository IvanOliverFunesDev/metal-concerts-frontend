import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConcertsService } from '../../../services/concerts.service';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { ConcertDetails, RelatedConcert, ConcertsOfSameBand } from '../../../interfaces/concert';
import { Subscription } from 'rxjs';
import { ReviewsService } from '../../../services/reviews.service';
import { Review } from '../../../interfaces/review';

@Component({
  selector: 'app-concert-details-page',
  imports: [NgIf, DatePipe, NgFor],
  templateUrl: './concert-details-page.component.html',
  styleUrl: './concert-details-page.component.css'
})
export class ConcertDetailsPageComponent implements OnInit {
  concert!: ConcertDetails | null;
  reviews: Review[] = [];
  relatedConcerts: RelatedConcert[] = [];
  concertsOfSameBand: ConcertsOfSameBand[] = []
  isLoading: boolean = true;
  errorMessage: string | null = null;
  private routeSub!: Subscription; // 🔥 Guardamos la suscripción a la ruta

  constructor(private route: ActivatedRoute, private router: Router, private concertsService: ConcertsService, private reviewsService: ReviewsService) { }
  ngOnInit(): void {

    // 🔥 Escuchamos cambios en la URL para recargar datos sin refrescar la página
    this.routeSub = this.route.paramMap.subscribe(params => {
      const concertId = params.get('id');
      if (concertId) {
        this.loadConcertDetails(concertId);
        this.loadReviews(concertId);
      }
    });
  }

  private loadReviews(concertId: string) {
    this.reviewsService.getReviews(concertId).subscribe({
      next: (data) => {
        console.log('Reviews esperadas:', data);
        this.reviews = data;
      },
      error(err) {
        console.error('Error cargando reviews:', err);
      },
    })
  }

  isPastConcert(date: Date): boolean {
    const concertDate = new Date(date);
    const currentDate = new Date();
    return concertDate < currentDate;  // Si la fecha del concierto es pasada
  }

  // 🔥 Función para cargar los detalles del concierto
  private loadConcertDetails(concertId: string) {
    this.isLoading = true;
    this.concertsService.getConcertById(concertId).subscribe({
      next: (data) => {
        if (data) {
          this.concert = data;
          this.relatedConcerts = data.relatedConcerts;
          this.concertsOfSameBand = data.concertsOfSameBand;
        } else {
          this.errorMessage = '❌ No se encontraron detalles del concierto.';
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error cargando el concierto:', err);
        this.errorMessage = '❌ Error al cargar el concierto.';
        this.isLoading = false;
      }
    });
  }

  goToDetailsBand() {
    if (this.concert?.band?.id) {
      this.router.navigate(['/band', this.concert.band.id]);
    } else {
      console.error('No se puede acceder a la banda o su ID');
    }
  }

  goToDetails(concert: RelatedConcert | ConcertsOfSameBand) { // para que le sirva los dos tipos de datos. PENSAR EN EXTENDER INTERFACES EN EL FUTURO
    if (!concert || !concert.id) {
      console.error('El objeto concert o su ID es undefined o null');
      return;
    }
    console.log('Navegando a:', `/concert/${concert.id}`);
    this.router.navigate([`/concert`, concert.id]).catch(err => console.error('Error en la navegación:', err));
  }

  // 🔥 Liberamos la suscripción cuando el componente se destruye
  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
