import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Review } from '../interfaces/review';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  private apiUrl = 'https://metal-concerts-backend.onrender.com/api/v1/reviews';

  constructor(private http: HttpClient) { }

  getReviews(concertId: string): Observable<Review[]> {
    return this.http.get<{ success: boolean; message: string; data: Review[] }>(`${this.apiUrl}/${concertId}`).pipe(
      map(response => response.data), // ✅ igual que en ConcertsService
      catchError(error => {
        console.error('Error obteniendo reviews:', error);
        return of([]);
      })
    );
  }

  postReviews(concertId: string, review: { rating: number; comment: string }): Observable<Review> {
    return this.http.post<{ success: boolean; message: string; data: Review }>(`${this.apiUrl}/${concertId}`, review).pipe(
      map(res => res.data),
      catchError(error => {
        console.error('Error creando review:', error);
        return throwError(() => new Error(error.error?.message || 'Error creando la review'));
      })
    )
  }

}
