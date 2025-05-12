import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, retry, tap, throwError } from 'rxjs';
import { Band, BandPublic, VeryBasicBand } from '../interfaces/band';

@Injectable({
  providedIn: 'root'
})
export class BandsService {
  private apiUrl = 'https://metal-concerts-backend.onrender.com/api/v1/bands';
  private apiUrlUser = 'https://metal-concerts-backend.onrender.com/api/v1/subscriptions';

  // private apiUrlUser = 'http://localhost:3000/api/v1/subscriptions';
  // private apiUrl = 'http://localhost:3000/api/v1/bands';

  constructor(private http: HttpClient) { }

  getBandsAll(filters: { bandName?: string; genre?: string } = {}): Observable<Band[]> {
    let params = new HttpParams;

    Object.entries(filters).forEach(([key, value]) => {
      if (value) params = params.set(key, value);
    })
    return this.http.get<{ success: boolean, message: string, data: Band[] }>(`${this.apiUrl}`, { params }).pipe(
      map(response => response.data),
      catchError(error => {
        console.error('Error obtenido bandas', error);
        return of([]);
      })
    );
  }

  getBandById(id: string): Observable<BandPublic | null> {
    return this.http.get<{ success: boolean, message: string, data: BandPublic }>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data),
      catchError(error => {
        console.error('Error obteniendo bandas', error);
        return of(null)
      })
    )
  }

  getBandsPopular(limit: number = 0): Observable<Band[]> {
    const params = new HttpParams()
      .set('limit', limit > 0 ? limit.toString() : 'all');

    return this.http.get<{ success: boolean, message: string, data: Band[] }>(`${this.apiUrl}/popular`, { params }).pipe(
      map(response => response.data),
      catchError(error => {
        return of([]);
      })
    );
  }

  getBandsTopRated(limit: number = 0): Observable<Band[]> {
    const params = new HttpParams()
      .set('limit', limit > 0 ? limit.toString() : 'all');

    return this.http.get<{ success: boolean, message: string, data: Band[] }>(`${this.apiUrl}/top-rated`, { params }).pipe(
      map(response => response.data),
      catchError(error => {
        return of([]);
      })
    );
  }

  getUserSubscription(): Observable<VeryBasicBand[]> {
    return this.http.get<{ success: boolean, message: string, data: VeryBasicBand[] }>(
      `${this.apiUrlUser}/subscriptions`
    ).pipe(
      tap(response => {
        console.log('Respuesta completa del servicio:', response);  // Verifica la estructura completa de la respuesta
      }),
      map(response => response.data),
      catchError(error => {
        console.error('Error obteniendo conciertos favoritos:', error);
        return of([]);
      })
    );
  }

  addSubcriptionsBand(bandId: string): Observable<string> {
    return this.http.post<{ success: boolean, message: string }>(
      `${this.apiUrlUser}/subscribe/${bandId}`,
      {},
      { withCredentials: true }
    ).pipe(map(response => response.message),
      catchError(error => {
        console.error('Error al suscribirse a la banda:', error);
        return throwError(() => new Error(error.error?.message || error.message || 'Error removing favorite concert'));
      })
    );
  }

  removeSubcriptionsBand(bandId: string): Observable<string> {
    return this.http.delete<{ success: boolean, message: string }>(
      `${this.apiUrlUser}/unsubscribe/${bandId}`,
      { withCredentials: true }
    ).pipe(map(response => response.message),
      catchError(error => {
        console.error('Error al eliminar la suscripción a la banda:', error);
        return throwError(() => new Error(error.error?.message || 'Error removing favorite concert'));
      })
    );
  }
}



