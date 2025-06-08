import { Component, OnInit } from '@angular/core';
import { BandPublic, BaseBand } from '../../../interfaces/band';
import { Router } from '@angular/router';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { BandsService } from '../../../services/bands.service';
import { ConcertsService } from '../../../services/concerts.service';
import { BaseConcert, Concert } from '../../../interfaces/concert';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { NavbarbandsComponent } from "../../layout/navbarbands/navbarbands.component";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-band-panel',
  standalone: true,
  imports: [NgIf, NgFor, DatePipe, FormsModule, ReactiveFormsModule, NavbarbandsComponent],
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

  genres: string[] = [];
  editingGenre = false;
  temporaryGenre = '';

  editingImage = false;
  selectedImageFile: File | null = null;
  previewImageUrl: string | null = null;

  // 🎵 Crear concierto
  creatingConcert = false;
  concertForm!: FormGroup;
  concertImageFile: File | null = null;

  subscribers: any[] = [];
  showSubscribersModal = false;

  locations: string[] = [];

  editingConcert: Concert | null = null;


  constructor(
    private router: Router,
    public bandsService: BandsService,
    private fb: FormBuilder,
    public concertsService: ConcertsService
  ) { }

  ngOnInit(): void {
    this.concertForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      location: ['', Validators.required]
    });

    this.bandsService.getOwBand().subscribe({
      next: (data) => {
        if (data) {
          this.band = {
            ...data,
            pastConcerts: data.pastConcerts || [],
            upcomingConcerts: data.upcomingConcerts || []
          };
          this.temporaryGenre = this.band.genre;
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

    this.concertsService.getGenresConcerts().subscribe({
      next: (data) => this.genres = data,
      error: (err) => console.error('❌ Error cargando géneros:', err)
    });

    this.concertsService.getLocationsConcerts().subscribe({
      next: (data) => {
        this.locations = data;
      },
      error: (err) => console.error('Error cargando ubicaciones:', err)
    });

    this.concertsService.getLocationsConcerts().subscribe({
      next: (data) => {
        this.locations = data;
      },
      error: (err) => console.error('Error cargando ubicaciones:', err)
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
        console.error('❌ Error updating the description:', err);
      }
    });
  }

  enableGenreEdit(): void {
    this.temporaryGenre = this.band.genre;
    this.editingGenre = true;
  }

  cancelGenreEdit(): void {
    this.editingGenre = false;
    this.temporaryGenre = '';
  }

  saveGenre(): void {
    if (!this.temporaryGenre.trim()) return;

    this.bandsService.updateBandGenre(this.temporaryGenre).subscribe({
      next: (updatedBand) => {
        this.band.genre = updatedBand.genre;
        this.editingGenre = false;
      },
      error: (err) => {
        console.error('❌ Error actualizando el género:', err);
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

  openConcertModal(concert?: Concert): void {
    this.creatingConcert = true;
    this.editingConcert = concert || null;

    if (concert) {
      this.concertForm.patchValue({
        title: concert.title,
        description: concert.description,
        date: concert.date?.toString().substring(0, 10),
        location: concert.location
      });
    } else {
      this.concertForm.reset();
      this.concertImageFile = null;
    }
  }

  closeConcertModal(): void {
    this.creatingConcert = false;
    this.editingConcert = null;
    this.concertForm.reset();
    this.concertImageFile = null;
  }


  onConcertImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.concertImageFile = input.files[0];
    }
  }

  submitConcert(): void {
    if (!this.concertForm.valid) return;

    const formData = new FormData();
    if (this.concertImageFile) {
      formData.append('file', this.concertImageFile);
    }

    formData.append('title', this.concertForm.value.title!);
    formData.append('description', this.concertForm.value.description!);
    formData.append('date', this.concertForm.value.date!);
    formData.append('location', this.concertForm.value.location!);

    if (this.editingConcert) {
      // Edit mode
      this.concertsService.updateConcert(this.editingConcert.id!, formData).subscribe({
        next: (updatedConcert) => {
          Swal.fire('✅ Concert updated', 'Changes have been saved.', 'success')
            .then(() => {
              window.location.reload(); // 🔁 Reload to see changes
            });
          this.closeConcertModal();
        },
        error: (err) => {
          console.error('❌ Error updating concert:', err);
          Swal.fire('Error', 'The concert could not be updated.', 'error');
        }
      });
    } else {
      // Create mode
      this.concertsService.createConcert(formData).subscribe({
        next: (concert) => {
          this.band.upcomingConcerts.push(concert);
          this.closeConcertModal();
          Swal.fire('✅ Concert created', '', 'success');
        },
        error: (err) => {
          console.error('❌ Error creating concert:', err);
          Swal.fire('Error', 'The concert could not be created.', 'error');
        }
      });
    }

  }

  deleteConcert(concertId: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action will permanently delete the concert.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.concertsService.deleteConcert(concertId).subscribe({
          next: () => {
            // Remove from local list
            this.band.upcomingConcerts = this.band.upcomingConcerts.filter(c => c.id !== concertId);

            Swal.fire('Deleted!', 'The concert has been deleted.', 'success');
          },
          error: (err) => {
            console.error('❌ Error deleting concert:', err);
            Swal.fire('Error', 'The concert could not be deleted.', 'error');
          }
        });
      }
    });
  }

  loadSubscribers(): void {
    this.bandsService.getSubscribers().subscribe({
      next: (res) => {
        this.subscribers = res.data;
        console.log(res.data)
        this.showSubscribersModal = true;
      },
      error: (err) => {
        console.error('Error cargando suscriptores:', err);
      }
    });
  }

  closeSubscribersModal(): void {
    this.showSubscribersModal = false;
  }
}
