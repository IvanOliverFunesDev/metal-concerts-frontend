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

  // Obtiene todos los conciertos
  getConcertsAll(): Observable<Concert[]> {
    return this.http.get<Concert[]>(this.concertsUrl).pipe(
      map(concerts => {
        // No es necesario convertir la fecha a Date aquí si solo se necesita para comparación de cadenas.
        return concerts;
      }),
      catchError(error => {
        console.error('Error cargando conciertos:', error);
        return of([]); // Devuelve un array vacío en caso de error
      })
    );
  }

  // Obtiene los conciertos más recientes
  getRecentConcerts(limit: number): Observable<Concert[]> {
    return this.getConcertsAll().pipe(
      map(concerts =>
        concerts
          .filter(concert => concert.date >= new Date().toISOString().split('T')[0]) // Filtra conciertos futuros (compara como cadena)
          .sort((a, b) => a.date.localeCompare(b.date)) // Ordena los conciertos por fecha como cadenas (en formato YYYY-MM-DD)
          .slice(0, limit) // Limita los resultados al número que se solicita
      )
    );
  }


  // Obtiene un número limitado de conciertos destacados de forma aleatoria
  getRandomFeaturedConcert(limit: number): Observable<Concert[]> {
    return this.getConcertsAll().pipe(
      map(concerts => {
        const shuffled = concerts.sort(() => Math.random() - 0.5); // Mezcla aleatoriamente los conciertos
        return shuffled.slice(0, limit); // Devuelve solo el número de conciertos que se necesita
      })
    );
  }

  // Obtiene un concierto por su ID
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
        const shuffled = [...bands].sort(() => Math.random() - 0.5); // Mezcla aleatoriamente las bandas
        return shuffled.slice(0, limit); // Devuelve solo `limit` bandas
      }),
      catchError(error => {
        console.error('Error cargando bandas destacadas:', error);
        return of([]); // Devuelve un array vacío si hay error
      })
    );
  }

  getBandById(id: string): Observable<Band | null> {
    return this.getBandsAll().pipe(
      map(bands => bands.find(band => band._id === id) || null),
      catchError((error) => {
        console.error(`Error al obtener la banda con ID: ${id}`, error);
        return of(null); // Devuelve null si no se encuentra la banda
      })
    );
  }

}


