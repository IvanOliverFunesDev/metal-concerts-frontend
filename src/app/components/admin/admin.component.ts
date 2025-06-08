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
      title: 'Are you sure?',
      text: 'Do you want to approve this band?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, approve',
      cancelButtonText: 'Cancel'
    }).then(result => {
      if (result.isConfirmed) {
        this.adminService.approveBand(bandId).subscribe({
          next: () => {
            Swal.fire('Approved', 'The band has been approved.', 'success');
            this.fetchPendingBands();
          },
          error: (err) => {
            console.error('Error approving band', err);
            Swal.fire('Error', 'The band could not be approved.', 'error');
          }
        });
      }
    });
  }


  rejectBand(bandId: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to reject this band?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, reject',
      cancelButtonText: 'Cancel'
    }).then(result => {
      if (result.isConfirmed) {
        this.adminService.rejectBand(bandId).subscribe({
          next: () => {
            Swal.fire('Rejected', 'The band has been rejected.', 'success');
            this.fetchPendingBands();
          },
          error: (err) => {
            console.error('Error rejecting band', err);
            Swal.fire('Error', 'The band could not be rejected.', 'error');
          }
        });
      }
    });
  }

}
