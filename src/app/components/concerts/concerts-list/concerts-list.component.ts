import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ConcertsService } from '../../../services/concerts.service';
import { ConcertsCardComponent } from "../concerts-card/concerts-card.component";
import { Concert } from '../../../interfaces/concert';

@Component({
  selector: 'app-concerts-list',
  standalone: true,
  imports: [NgFor, ConcertsCardComponent, NgIf],
  templateUrl: './concerts-list.component.html',
  styleUrl: './concerts-list.component.css'
})
export class ConcertsListComponent implements OnInit, OnDestroy, OnChanges {
  @Input() fetchData!: (filters?: any) => Observable<Concert[]>;
  @Input() filters: any = {};
  @Input() title: string = '';

  concerts: Concert[] = [];
  hasConcerts: boolean | null = null;
  isLoading: boolean = true;
  private subscription!: Subscription;

  constructor(private concertsService: ConcertsService) { }

  ngOnInit(): void {
    this.loadConcerts();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filters']) {
      this.loadConcerts(); // 🔥 Si cambian los filtros, recarga los conciertos
    }
  }

  loadConcerts(): void {
    if (this.subscription) {
      this.subscription.unsubscribe(); // 🔥 Evita múltiples suscripciones
    }
    this.isLoading = true;

    this.subscription = this.fetchData(this.filters).subscribe({
      next: (data) => {
        this.concerts = data || [];
        this.hasConcerts = this.concerts.length > 0;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error cargando conciertos:', err);
        this.hasConcerts = false;
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
