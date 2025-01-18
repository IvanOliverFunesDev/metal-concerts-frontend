import { NgFor } from '@angular/common';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ConcertsService } from '../../../services/concerts.service';
import { ConcertsCardComponent } from "../concerts-card/concerts-card.component";
import { Concert } from '../../../interfaces/concert';

@Component({
  selector: 'app-concerts-list',
  imports: [NgFor, ConcertsCardComponent],
  templateUrl: './concerts-list.component.html',
  styleUrl: './concerts-list.component.css'
})
export class ConcertsListComponent implements OnInit, OnDestroy {
  @Input() fetchData!: () => Observable<Concert[]>;

  @Input() title: string = '';

  concerts: Concert[] = [];

  private subscription!: Subscription;

  constructor(private concertsService: ConcertsService) { }

  ngOnInit(): void {
    this.subscription = this.fetchData().subscribe({
      next: (data) => {
        this.concerts = data;
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
