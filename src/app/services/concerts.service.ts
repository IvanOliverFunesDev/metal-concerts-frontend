import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Concert, ConcertDetails, FavoriteConcert } from '../interfaces/concert';
import { response } from 'express';
@Injectable({
  providedIn: 'root'
})
export class ConcertsService {
  private apiUrl = 'https://metal-concerts-backend.onrender.com/api/v1/concerts';
  // private apiUrl = 'http://localhost:3000/api/v1/concerts';
  // private apiUrlUser = 'http://localhost:3000/api/v1/users';
  private apiUrlUser = 'https://metal-concerts-backend.onrender.com/api/v1/users';

  constructor(private http: HttpClient) { }

  getConcertsAll(filters: { title?: string; location?: string; date?: string; bandName?: string; genre?: string } = {}): Observable<Concert[]> {
    let params = new HttpParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value) params = params.set(key, value);
    })
    return this.http.get<{ success: boolean, message: string, data: Concert[] }>(`${this.apiUrl}`, { params }).pipe(
      map(response => response.data),
      catchError(error => {
        console.error('Error obteniendo conciertos:', error);
        return of([]);
      })
    );
  }
  getGenresConcerts(): Observable<string[]> {
    return this.http.get<{ success: boolean, message: string, data: string[] }>(`${this.apiUrl}/genres`).pipe(
      map(response => response.data),
      catchError(error => {
        console.error('Error obteniendo generos:', error);
        return of([]);
      })
    );
  }
  getLocationsConcerts(): Observable<string[]> {
    return this.http.get<{ success: boolean, message: string, data: string[] }>(`${this.apiUrl}/locations`).pipe(
      map(response => response.data),
      catchError(error => {
        console.error('Error obteniendo localizaciones:', error);
        return of([]);
      })
    );
  }
  getConcertById(id: string): Observable<ConcertDetails | null> {
    return this.http.get<{ success: boolean, message: string, data: ConcertDetails }>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data),
      catchError(error => {
        console.error('Error obteniendo conciertos:', error);
        return of(null);
      })
    );
  }
  getConcertsUpcoming(): Observable<Concert[]> {
    return this.http.get<{ success: boolean, message: string, data: Concert[] }>(`${this.apiUrl}/recent`).pipe(
      map(response => response.data),
      catchError(error => {
        console.error('Error obteniendo conciertos:', error);
        return of([]);
      })
    );
  }
  getMostPopularConcerts(limit: number = 0): Observable<Concert[]> {
    const params = new HttpParams()
      .set('limit', limit > 0 ? limit.toString() : 'all');

    return this.http.get<{ success: boolean, message: string, data: Concert[] }>(`${this.apiUrl}/most-popular`, { params }).pipe(
      map(response => response.data),
      catchError(error => {
        console.error('Error obteniendo conciertos:', error);
        return of([]);
      })
    );
  }
  getTopRatedConcerts(limit: number = 0): Observable<Concert[]> {
    const params = new HttpParams()
      .set('limit', limit > 0 ? limit.toString() : 'all');

    return this.http.get<{ success: boolean, message: string, data: Concert[] }>(`${this.apiUrl}/top-rated`, { params }).pipe(
      map(response => response.data),
      catchError(error => {
        console.error('Error obteniendo conciertos:', error);
        return of([]);
      })
    );
  }
  getFavoriteConcerts(): Observable<FavoriteConcert[]> {
    return this.http.get<{ success: boolean, message: string, data: { favoriteConcerts: FavoriteConcert[] } }>(
      `${this.apiUrlUser}/favorites`).pipe(
        map(response => response.data.favoriteConcerts),
        catchError(error => {
          console.error('Error obteniendo conciertos favoritos:', error);
          return of([]);
        })
      );
  }
  addFavoriteConcert(concertId: string): Observable<FavoriteConcert> {
    return this.http.post<{ success: boolean, message: string, data: FavoriteConcert }>(
      `${this.apiUrlUser}/favorites/${concertId}`,
      {},
      { withCredentials: true }
    ).pipe(map(response => response.data),
      catchError(error => {
        console.error('Error al eliminar favorito:', error);
        return throwError(() => new Error(error.error?.message || 'Error removing favorite concert'));
      })
    );
  }
  removeFavoriteConcert(concertId: string): Observable<string> {
    return this.http.delete<{ success: boolean, message: string }>(
      `${this.apiUrlUser}/favorites/${concertId}`,
      { withCredentials: true }
    ).pipe(map(response => response.message),
      catchError(error => {
        console.error('Error al eliminar favorito:', error);
        return throwError(() => new Error(error.error?.message || 'Error removing favorite concert'));
      })
    );
  }

}



