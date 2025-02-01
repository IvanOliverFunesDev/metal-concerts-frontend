import { Component } from '@angular/core';
import { BandPublic } from '../../../interfaces/band-profile-public';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { BandsService } from '../../../services/bands.service';

@Component({
  selector: 'app-see-bands-details',
  imports: [NgIf, NgFor, DatePipe],
  templateUrl: './see-bands-details.component.html',
  styleUrl: './see-bands-details.component.css'
})
export class SeeBandsDetailsComponent {
  band!: BandPublic;
  isLoading: boolean = true; // 🔥 Nuevo: Controla la carga
  errorMessage: string | null = null; // 🔥 Nuevo: Si hay error, mostramos mensaje

  constructor(private route: ActivatedRoute, private router: Router, public bandsService: BandsService) { }

  ngOnInit(): void {
    const bandId = this.route.snapshot.paramMap.get('id');

    if (bandId) {
      this.bandsService.getBandById(bandId).subscribe({
        next: (data) => {
          if (data) {
            this.band = {
              ...data,
              pastConcerts: data.pastConcerts || [],
              upcomingConcerts: data.upcomingConcerts || []
            };
          } else {
            this.errorMessage = '❌ Banda no encontrada';
          }
          this.isLoading = false; // 🔥 Deja de cargar
        },
        error: (err) => {
          console.error('Error cargando la banda:', err);
          this.errorMessage = '❌ Error al cargar la banda.';
          this.isLoading = false;
        }
      });
    } else {
      this.errorMessage = '❌ Banda no encontrada';
      this.isLoading = false;
    }
  }
  goToConcert(concert: { id?: string; _id?: string }): void {
    const concertId = concert._id || concert.id;
    if (concertId) {
      this.router.navigate(['/concert', concertId]);
    } else {
      console.error('Error: No se encontró el ID del concierto.');
    }
  }
}
