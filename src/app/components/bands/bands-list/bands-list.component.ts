import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ConcertsService } from '../../../services/concerts.service';
import { NgFor } from '@angular/common';
import { BandsCardComponent } from "../bands-card/bands-card.component";
import { BandList } from '../../../interfaces/band';

@Component({
  selector: 'app-bands-list',
  imports: [NgFor, BandsCardComponent],
  templateUrl: './bands-list.component.html',
  styleUrl: './bands-list.component.css'
})
export class BandsListComponent implements OnInit, OnDestroy {
  // Ahora `fetchData` devuelve un `Observable<>`, no un array directamente
  @Input() fetchData!: () => Observable<BandList[]>; // Usa la interfaz Band
  @Input() title: string = '';

  bands: BandList[] = [];

  private subscription!: Subscription;

  constructor(private concertsService: ConcertsService) { }

  ngOnInit(): void {
    // Suscribirse al `Observable` que devuelve `fetchData()`
    this.subscription = this.fetchData().subscribe({
      next: (data) => {
        this.bands = data;
        console.log('Bandas en el listado:', this.bands);

      },
      error: (err) => {
        console.error('Error cargando conciertos:', err);
      }
    });
  }

  ngOnDestroy(): void {
    // Cancelar la suscripción al destruir el componente para evitar memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
