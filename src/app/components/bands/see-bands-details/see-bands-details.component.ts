import { Component } from '@angular/core';
import { BandPublic, BaseBand } from '../../../interfaces/band';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { BandsService } from '../../../services/bands.service';
import Swal from 'sweetalert2';
import { BaseConcert } from '../../../interfaces/concert';

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

  toggleSubcriptions(band: BaseBand): void {
    if (band.isSubscribed) {
      this.removeFromSubcriptionsBand(band)
    } else {
      this.addToSubcriptions(band)
    }
  }

  addToSubcriptions(band: BaseBand) {
    if (!this.band) return;
    this.bandsService.addSubcriptionsBand(this.band.id).subscribe({
      next: (res) => {
        console.log("añadido");
        band.isSubscribed = true; // Cambia el estado en el frontend
      },
      error: (error) => {
        if (error.message === 'Unauthorized') {
          Swal.fire({
            icon: "error",
            title: "You must be logged in",
            text: "To subscribe to this band, please log in or register.",
            showCancelButton: true,
            confirmButtonText: "Login",
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/login']);
            }
          });
        } else {
          // Para otros errores, mostramos el mensaje genérico
          Swal.fire({
            icon: "error",
            title: "Oops! Something went wrong",
            text: error.message,
            confirmButtonText: "Got it"
          });
        }
      }
    });
  }


  removeFromSubcriptionsBand(band: BaseBand) {
    if (!this.band) return
    this.bandsService.removeSubcriptionsBand(this.band.id).subscribe({
      next: (res) => {
        console.log("eliminado");
        band.isSubscribed = false;
      },
      error: (err) => {
        Swal.fire({
          icon: "error",
          title: "Oops! Something went wrong",
          text: err.message,
          confirmButtonText: "Got it"
        });
      }
    });
  }

  goToConcert(concert: BaseConcert): void {
    const concertId = concert.id;
    if (concertId) {
      this.router.navigate(['/concert', concertId]);
    } else {
      console.error('Error: No se encontró el ID del concierto.');
    }
  }
}
