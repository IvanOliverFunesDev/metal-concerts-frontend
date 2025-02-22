import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ConcertsService } from '../../../services/concerts.service';
import { NgFor } from '@angular/common';
import { BandsCardComponent } from "../bands-card/bands-card.component";
import { Band } from '../../../interfaces/band';
import { BandsService } from '../../../services/bands.service';

@Component({
  selector: 'app-bands-list',
  standalone: true,
  imports: [NgFor, BandsCardComponent],
  templateUrl: './bands-list.component.html',
  styleUrl: './bands-list.component.css'
})
export class BandsListComponent implements OnInit, OnChanges, OnDestroy {
  // Ahora `fetchData` devuelve un `Observable<>`, no un array directamente
  @Input() fetchData!: (filters?: any) => Observable<Band[]>; // Usa la interfaz Band
  @Input() filters: any = {};
  @Input() title: string = '';

  bands: Band[] = [];

  private subscription!: Subscription;

  constructor(private concertsService: ConcertsService, private bandsService: BandsService) { }

  ngOnInit(): void {
    this.loadBands();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filters']) {
      this.loadBands(); // 🔥 Si cambian los filtros, recarga los conciertos
    }
  }

  loadBands(): void {
    if (this.subscription) {
      this.subscription.unsubscribe(); // 🔥 Evita múltiples suscripciones
    }
    this.subscription = this.fetchData(this.filters).subscribe({
      next: (data) => {
        this.bands = data;
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
