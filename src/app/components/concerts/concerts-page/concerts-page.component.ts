import { Component, OnInit } from '@angular/core';
import { ConcertsService } from '../../../services/concerts.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ConcertsListComponent } from '../concerts-list/concerts-list.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-concerts-page',
  standalone: true,
  imports: [ConcertsListComponent, ReactiveFormsModule, NgFor],
  templateUrl: './concerts-page.component.html',
  styleUrl: './concerts-page.component.css'
})
export class ConcertsPageComponent implements OnInit {
  filterForm!: FormGroup;
  genres: string[] = [];
  locations: string[] = [];

  constructor(public concertsService: ConcertsService, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.filterForm = this.fb.group({
      title: [''],
      location: [''],
      genre: ['']
    });

    this.concertsService.getGenresConcerts().subscribe({
      next: (data) => {
        this.genres = data;
      },
      error: (err) => console.error('Error cargando géneros:', err.message)
    });
    this.concertsService.getLocationsConcerts().subscribe({
      next: (data) => {
        this.locations = data;
      },
      error: (err) => console.error('Error cargando ubicaciones:', err)
    });
  }


  applyFilters() {
    const filters = this.filterForm.value; // 🔥 Obtenemos los valores del formulario

    // 🔥 Verificamos en consola qué valores estamos enviando

    // 🔥 Validamos que solo enviamos los filtros con valores válidos
    const cleanedFilters: any = {};
    if (filters.title) cleanedFilters.title = filters.title.trim();
    if (filters.location) cleanedFilters.location = filters.location.trim();
    if (filters.genre) cleanedFilters.genre = filters.genre.trim();


    this.concertsService.getConcertsAll(cleanedFilters).subscribe({
      next: (data) => {
        console.log('Conciertos recibidos:', data); // ✅ Verificar la respuesta del backend
      },
      error: (err) => console.error('Error cargando conciertos con filtros:', err)
    });
  }
}
