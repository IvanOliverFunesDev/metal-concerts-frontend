import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Band } from '../interfaces/band';
import { Concert } from '../interfaces/concert';

@Injectable({
  providedIn: 'root'
})
export class ConcertsService {
  private concertsUrl = 'concerts.json';
  private bandsUrl = 'bands.json';

  constructor(private http: HttpClient) { }

  getConcertsAll(): Observable<Concert[]> {
    return this.http.get<Concert[]>(this.concertsUrl).pipe(
      map(concerts => {
        return concerts;
      }),
      catchError(error => {
        console.error('Error cargando conciertos:', error);
        return of([]); // Devuelve un array vacío en caso de error
      })
    );
  }

  getRecentConcerts(limit: number): Observable<Concert[]> {
    return this.getConcertsAll().pipe(
      map(concerts =>
        concerts
          .filter(concert => concert.date >= new Date().toISOString().split('T')[0])
          .sort((a, b) => a.date.localeCompare(b.date))
          .slice(0, limit)
      )
    );
  }



  getRandomFeaturedConcert(limit: number): Observable<Concert[]> {
    return this.getConcertsAll().pipe(
      map(concerts => {
        const shuffled = concerts.sort(() => Math.random() - 0.5);
        return shuffled.slice(0, limit);
      })
    );
  }

  getConcertById(id: string): Observable<Concert | null> {
    return this.getConcertsAll().pipe(
      map(concerts => concerts.find(concert => concert._id === id) || null)
    );
  }

  getConcertsByBandId(bandId: string): Observable<Concert[]> {
    return this.getConcertsAll().pipe(
      map(concerts => concerts.filter(concert => concert.band._id === bandId)),
      catchError((error) => {
        console.error(`Error al obtener conciertos de la banda con ID: ${bandId}`, error);
        return of([]);
      })
    );
  }

  // ------------------------------------------------------------------------------------------

  getBandsAll(): Observable<Band[]> {
    return this.http.get<Band[]>(this.bandsUrl).pipe(
      catchError(error => {
        console.error('Error cargando bandas:', error);
        return of([]);
      })
    );
  }

  getRandomFeaturedBands(limit: number): Observable<Band[]> {
    return this.getBandsAll().pipe(
      map(bands => {
        const shuffled = [...bands].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, limit);
      }),
      catchError(error => {
        console.error('Error cargando bandas destacadas:', error);
        return of([]);
      })
    );
  }

  getBandById(id: string): Observable<Band | null> {
    return this.getBandsAll().pipe(
      map(bands => bands.find(band => band._id === id) || null),
      catchError((error) => {
        console.error(`Error al obtener la banda con ID: ${id}`, error);
        return of(null);
      })
    );
  }

}


