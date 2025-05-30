import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { NgFor, NgIf } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  standalone: true,
  imports: [NgIf, NgFor]
})
export class AdminComponent implements OnInit {
  pendingBands: any[] = [];
  expandedBandId: string | null = null;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.fetchPendingBands();
  }

  fetchPendingBands(): void {
    this.adminService.getPendingBands().subscribe({
      next: (res) => {
        this.pendingBands = res.data.bands;
      },
      error: (err) => {
        console.error('Error al obtener bandas pendientes', err);
      }
    });
  }

  toggleDetails(bandId: string): void {
    this.expandedBandId = this.expandedBandId === bandId ? null : bandId;
  }

  approveBand(bandId: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres aprobar esta banda?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, aprobar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.adminService.approveBand(bandId).subscribe({
          next: () => {
            Swal.fire('Aprobada', 'La banda ha sido aprobada.', 'success');
            this.fetchPendingBands();
          },
          error: (err) => {
            console.error('Error al aprobar banda', err);
            Swal.fire('Error', 'No se pudo aprobar la banda.', 'error');
          }
        });
      }
    });
  }

  rejectBand(bandId: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres rechazar esta banda?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, rechazar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.adminService.rejectBand(bandId).subscribe({
          next: () => {
            Swal.fire('Rechazada', 'La banda ha sido rechazada.', 'success');
            this.fetchPendingBands();
          },
          error: (err) => {
            console.error('Error al rechazar banda', err);
            Swal.fire('Error', 'No se pudo rechazar la banda.', 'error');
          }
        });
      }
    });
  }
}
