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

  constructor(private http: HttpClient) { }

  getBandsAll(filters: { bandName?: string; genre?: string } = {}): Observable<Band[]> { // traer todas las bandas
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

  getBandById(id: string): Observable<BandPublic | null> { //Ir a la vista de detalles de una banda por la id
    return this.http.get<{ success: boolean, message: string, data: BandPublic }>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data),
      catchError(error => {
        console.error('Error obteniendo bandas', error);
        return of(null)
      })
    )
  }

  getOwBand(): Observable<BandPublic | null> { //Ir a mi vista de detalles (Soy la banda)
    return this.http.get<{ success: boolean, message: string, data: BandPublic }>(`${this.apiUrl}/me`).pipe(
      map(response => response.data),
      catchError(error => {
        console.error('Error obteniendo bandas', error);
        return of(null)
      })
    )
  }

  getBandsPopular(limit: number = 0): Observable<Band[]> { //Bandas mas populares
    const params = new HttpParams()
      .set('limit', limit > 0 ? limit.toString() : 'all');

    return this.http.get<{ success: boolean, message: string, data: Band[] }>(`${this.apiUrl}/popular`, { params }).pipe(
      map(response => response.data),
      catchError(error => {
        return of([]);
      })
    );
  }

  getBandsTopRated(limit: number = 0): Observable<Band[]> { //Bandas con mas rated
    const params = new HttpParams()
      .set('limit', limit > 0 ? limit.toString() : 'all');

    return this.http.get<{ success: boolean, message: string, data: Band[] }>(`${this.apiUrl}/top-rated`, { params }).pipe(
      map(response => response.data),
      catchError(error => {
        return of([]);
      })
    );
  }

  getUserSubscription(): Observable<VeryBasicBand[]> { // Ver bandas subcritas
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

  addSubcriptionsBand(bandId: string): Observable<string> { //Subscribirse a una banda
    return this.http.post<{ success: boolean, message: string }>(
      `${this.apiUrlUser}/subscribe/${bandId}`,
      {}
    ).pipe(map(response => response.message),
      catchError(error => {
        console.error('Error al suscribirse a la banda:', error);
        return throwError(() => new Error(error.error?.message || error.message || 'Error removing favorite concert'));
      })
    );
  }

  removeSubcriptionsBand(bandId: string): Observable<string> { //Desupcribirse de una banda
    return this.http.delete<{ success: boolean, message: string }>(
      `${this.apiUrlUser}/unsubscribe/${bandId}`).pipe(map(response => response.message),
        catchError(error => {
          console.error('Error al eliminar la suscripción a la banda:', error);
          return throwError(() => new Error(error.error?.message || 'Error removing favorite concert'));
        })
      );
  }

  updateBandName(newName: string): Observable<BandPublic> {
    console.log('🚀 Enviando nombre:', newName); // 🔥 AÑADE ESTO

    return this.http.patch<{ success: boolean; message: string; data: BandPublic }>(
      `${this.apiUrl}/me/band-name`,
      { bandName: newName }
    ).pipe(
      map(res => res.data),
      catchError(err => {
        console.error('Error actualizando nombre:', err);
        return throwError(() => new Error('Error actualizando el nombre de la banda'));
      })
    );
  }

  updateBandImage(formData: FormData): Observable<BandPublic> {
    return this.http.patch<{ success: boolean; message: string; data: BandPublic }>(
      `${this.apiUrl}/me/image`,
      formData
    ).pipe(
      map(res => res.data),
      catchError(err => {
        console.error('❌ Error actualizando imagen de la banda:', err);
        return throwError(() => new Error('Error actualizando la imagen de la banda'));
      })
    );
  }



  updateBandDescription(newDescription: string): Observable<BandPublic> {
    return this.http.patch<{ success: boolean; message: string; data: BandPublic }>(
      `${this.apiUrl}/me/description`,
      { description: newDescription }
    ).pipe(
      map(res => res.data),
      catchError(err => {
        console.error('Error updating description:', err);
        return throwError(() => new Error('Error updating the band description'));

      })
    );
  }

  updateBandGenre(newGenre: string): Observable<BandPublic> {
    return this.http.patch<{ success: boolean; message: string; data: BandPublic }>(
      `${this.apiUrl}/me/genre`,
      { genre: newGenre }
    ).pipe(
      map(res => res.data),
      catchError(err => {
        console.error('Error updating genre:', err);
        return throwError(() => new Error('Error updating the band genre'));

      })
    );
  }

  getSubscribers() {
    return this.http.get<{ data: any[] }>('https://metal-concerts-backend.onrender.com/api/v1/subscriptions/subscribers');
  }


}



