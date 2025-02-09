import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://metal-concerts-backend.onrender.com/api/v1/auth';

  constructor(private http: HttpClient) { }



}

