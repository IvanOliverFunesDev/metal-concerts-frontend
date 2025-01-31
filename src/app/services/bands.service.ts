import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Band } from '../interfaces/band';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class BandsService {
  private apiUrl = 'http://localhost:3000/api/bands';
  constructor(private http: HttpClient) { }
  getBandsAll(): Observable<Band[]> {
    return this.http.get<{ succes: boolean, message: string, data: Band[] }>(this.apiUrl).pipe(
      map(response => response.data),
      catchError(error => {
        console.log('Error obtenido concierto:', error);
        return of([])
      })
    )
  }
}
