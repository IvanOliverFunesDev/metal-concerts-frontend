import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { BandList, BandPopulate } from '../interfaces/band';
import { BandPublic } from '../interfaces/band-profile-public';

@Injectable({
  providedIn: 'root'
})
export class BandsService {
  private apiUrl = 'http://localhost:3000/api/bands';
  constructor(private http: HttpClient) { }

  getBandsAll(): Observable<BandList[]> {
    return this.http.get<{ success: boolean, message: string, data: BandList[] }>(this.apiUrl).pipe(
      map(response => response.data),
      catchError(error => {
        console.log('Error obtenido concierto:', error);
        return of([])
      })
    )
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

  getBandsPopular(limit: number = 0): Observable<BandList[]> {
    const params = new HttpParams()
      .set('limit', limit > 0 ? limit.toString() : 'all');

    return this.http.get<{ success: boolean, message: string, data: BandList[] }>(`${this.apiUrl}/popular`, { params }).pipe(
      map(response => response.data),
      catchError(error => {
        console.log('Error obteniendo bandas populares:', error);
        return of([]);
      })
    );
  }
}



