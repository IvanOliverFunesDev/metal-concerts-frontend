import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'https://metal-concerts-backend.onrender.com/api/v1/admin';

  constructor(private http: HttpClient) { }


}

