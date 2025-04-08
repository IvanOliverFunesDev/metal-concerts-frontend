import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';
import { BandsCardComponent } from "../bands-card/bands-card.component";
import { Band, BaseBand } from '../../../interfaces/band';
import { BandsService } from '../../../services/bands.service';

@Component({
  selector: 'app-bands-list',
  standalone: true,
  imports: [NgFor, NgIf, BandsCardComponent],
  templateUrl: './bands-list.component.html',
  styleUrl: './bands-list.component.css'
})
export class BandsListComponent implements OnInit, OnChanges, OnDestroy {
  // Ahora `fetchData` devuelve un `Observable<>`, no un array directamente
  @Input() fetchData!: (filters?: any) => Observable<BaseBand[]>; // Usa la interfaz Band
  @Input() filters: any = {};
  @Input() title: string = '';

  bands: BaseBand[] = [];
  hasBands: boolean | null = null;
  isLoading: boolean = true;
  private subscription!: Subscription;

  constructor(private bandsService: BandsService) { }

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
    this.isLoading = true;

    this.subscription = this.fetchData(this.filters).subscribe({
      next: (data) => {
        this.bands = data;
        this.hasBands = this.bands.length > 0;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error cargando conciertos:', err);
        this.hasBands = false;
        this.isLoading = false;
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
