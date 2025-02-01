import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Concert, ConcertDetails } from '../interfaces/concert';

@Injectable({
  providedIn: 'root'
})
export class ConcertsService {

  private apiUrl = 'http://localhost:3000/api/concerts';

  constructor(private http: HttpClient) { }

  getConcertsAll(): Observable<Concert[]> {
    return this.http.get<{ success: boolean, message: string, data: Concert[] }>(this.apiUrl).pipe(
      map(response => response.data), // Aquí extraemos solo el array de conciertos
      catchError(error => {
        console.error('Error obteniendo conciertos:', error);
        return of([]);
      })
    );
  }

  getConcertById(id: string): Observable<ConcertDetails | null> {
    return this.http.get<{ success: boolean, message: string, data: ConcertDetails }>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data),
      catchError(error => {
        console.error('Error obteniendo conciertos:', error);
        return of(null); // 🔥 Devolvemos null en caso de error
      })
    );
  }

  getConcertsUpcoming(): Observable<Concert[]> {
    return this.http.get<{ success: boolean, message: string, data: Concert[] }>(`${this.apiUrl}/recent`).pipe(
      map(response => response.data), // Aquí extraemos solo el array de conciertos
      catchError(error => {
        console.error('Error obteniendo conciertos:', error);
        return of([]);
      })
    );
  }

  getConcertsHighlighted(): Observable<Concert[]> {
    return this.http.get<{ success: boolean, message: string, data: Concert[] }>(`${this.apiUrl}/highlighted`).pipe(
      map(response => response.data), // Aquí extraemos solo el array de conciertos
      catchError(error => {
        console.error('Error obteniendo conciertos:', error);
        return of([]);
      })
    );
  }

}



