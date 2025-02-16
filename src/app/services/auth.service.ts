import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://metal-concerts-backend.onrender.com/api/v1/auth';
  // private apiUrl = 'http://localhost:3000/api/v1/auth';
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    this.verifyToken().subscribe();
  }

  verifyToken(): Observable<User> {
    return this.http.get<{ success: boolean, message: string, data: User }>(`${this.apiUrl}/verify`,
      { withCredentials: true })
      .pipe(map(response => response.data), tap(user => {
        this.userSubject.next(user);
        console.log("✅ Usuario verificado desde el token:", user); // 🔥 PRUEBA
      }));
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<{ success: boolean; message: string; data: User }>(
      `${this.apiUrl}/login`,
      { email, password },
      { withCredentials: true })
      .pipe(map(response => response.data), tap(user => {
        this.userSubject.next(user); console.log("✅ Usuario logueado:", user); // 🔥 PRUEBA
      }));
  }

  registerUSer(email: string, password: string, username: string): Observable<User> {
    return this.http.post<{ success: boolean; message: string; data: User }>(
      `${this.apiUrl}/register/user`,
      { email, password, username },
      { withCredentials: true })
      .pipe(map(response => response.data), tap(user => {
        this.userSubject.next(user); console.log("✅ Usuario Registrado:", user); // 🔥 PRUEBA
      }));
  }

  logout(): Observable<any> {
    return this.http.post<{ success: boolean, message: string }>(
      `${this.apiUrl}/logout`,
      { withCredentials: true }
    ).pipe(
      tap(() => {
        this.userSubject.next(null);
        console.log("🚫 Usuario deslogueado, estado limpiado"); // 🔥 PRUEBA
      })
    );
  }

  getUser(): User | null {
    return this.userSubject.value; // Permite obtener el usuario sin suscribirse
  }
}

