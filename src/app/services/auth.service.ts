import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private apiUrl = 'https://metal-concerts-backend.onrender.com/api/v1/auth';
  private apiUrl = 'http://localhost:3000/api/v1/auth';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<User> {
    return this.http.post<{ success: boolean; message: string; data: User }>(
      `${this.apiUrl}/login`,
      { email, password },
      { withCredentials: true } // Necesario para que las cookies se envíen y reciban
    ).pipe(
      map(response => response.data) // Extraemos solo el objeto User
    );
  }


}

