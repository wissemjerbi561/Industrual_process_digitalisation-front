import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  constructor(private http: HttpClient) { }
  private baseUrl = 'http://localhost:8087';
  getToken(): string | null {
    return localStorage.getItem('token'); // ou le nom que vous avez utilisé pour sauvegarder le token
  }
  logout(): void {
    localStorage.removeItem('token'); // Supprime le token stocké
    console.log('Déconnexion réussie');
  }
  
}
