import { Component, OnInit } from '@angular/core';
import { BandsListComponent } from "../bands-list/bands-list.component";
import { BandsService } from '../../../services/bands.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ConcertsService } from '../../../services/concerts.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-bands-page',
  imports: [BandsListComponent, ReactiveFormsModule, NgFor],
  templateUrl: './bands-page.component.html',
  styleUrl: './bands-page.component.css'
})
export class BandsPageComponent implements OnInit {
  filterForm!: FormGroup
  genres: string[] = [];

  constructor(public bandsService: BandsService, public concertsService: ConcertsService, private fb: FormBuilder) { }
  ngOnInit(): void {
    this.filterForm = this.fb.group({
      bandName: [''],
      genre: ['']
    });
    this.concertsService.getGenresConcerts().subscribe({
      next: (data) => {
        this.genres = data;
      },
      error: (err) => console.error('Error cargando generos', err.message)
    });
  }
  applyFilters() {
    const filters = this.filterForm.value;

    const cleanedFilters: any = {};
    if (filters.bandName) cleanedFilters.bandName = filters.bandName.trim();
    if (filters.genre) cleanedFilters.genre = filters.genre.trim();

    this.bandsService.getBandsAll(cleanedFilters).subscribe({
      next: (data) => {
        console.log('Conciertos recibidos:', data);
      },
      error: (err) => console.error('Error cargando conciertos con filtros', err)
    })
  }
}
