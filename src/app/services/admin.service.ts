import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'https://metal-concerts-backend.onrender.com/api/v1/admin/bands';

  constructor(private http: HttpClient) { }

  getPendingBands(): Observable<any> {
    return this.http.get(`${this.apiUrl}/pending`);
  }

  approveBand(id: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/approved`, {});
  }

  rejectBand(id: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/reject`, {});
  }
}
