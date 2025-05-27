import { Component, OnInit } from '@angular/core';
import { BandPublic, BaseBand } from '../../../interfaces/band';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { BandsService } from '../../../services/bands.service';
import { BaseConcert } from '../../../interfaces/concert';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-band-panel',
  standalone: true,
  imports: [NgIf, NgFor, DatePipe, FormsModule],
  templateUrl: './band-panel.component.html',
  styleUrl: './band-panel.component.css'
})
export class BandPanel implements OnInit {
  band!: BandPublic;
  isLoading: boolean = true;
  errorMessage: string | null = null;

  editingName = false;
  temporaryName = '';

  editingDescription = false;
  temporaryDescription = '';

  editingImage = false;
  selectedImageFile: File | null = null;
  previewImageUrl: string | null = null;

  constructor(private router: Router, public bandsService: BandsService) { }

  ngOnInit(): void {
    this.bandsService.getOwBand().subscribe({
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
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error cargando la banda:', err);
        this.errorMessage = '❌ Error al cargar la banda.';
        this.isLoading = false;
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

  enableNameEdit(): void {
    this.temporaryName = this.band.bandName;
    this.editingName = true;
  }

  cancelNameEdit(): void {
    this.editingName = false;
    this.temporaryName = '';
  }

  saveName(): void {
    if (!this.temporaryName.trim()) return;

    this.bandsService.updateBandName(this.temporaryName).subscribe({
      next: (updatedBand) => {
        this.band.bandName = updatedBand.bandName;
        this.editingName = false;
      },
      error: (err) => {
        console.error('❌ Error actualizando el nombre:', err);
      }
    });
  }

  enableDescriptionEdit(): void {
    this.temporaryDescription = this.band.description;
    this.editingDescription = true;
  }

  cancelDescriptionEdit(): void {
    this.editingDescription = false;
    this.temporaryDescription = '';
  }

  saveDescription(): void {
    if (!this.temporaryDescription.trim()) return;

    this.bandsService.updateBandDescription(this.temporaryDescription).subscribe({
      next: (updatedBand) => {
        this.band.description = updatedBand.description;
        this.editingDescription = false;
      },
      error: (err) => {
        console.error('❌ Error actualizando la descripción:', err);
      }
    });
  }

  handleImageFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImageFile = input.files[0];
      this.previewImageUrl = URL.createObjectURL(this.selectedImageFile);
    }
  }

  saveImage(): void {
    if (!this.selectedImageFile) return;

    const formData = new FormData();
    formData.append('image', this.selectedImageFile);

    console.log('🧠 Enviando imagen al backend...');

    this.bandsService.updateBandImage(formData).subscribe({
      next: (updatedBand) => {
        this.band.image = updatedBand.image;
        this.editingImage = false;
        this.selectedImageFile = null;
      },
      error: (err) => {
        console.error('❌ Error guardando imagen:', err);
      }
    });
  }

}
