import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ 
  providedIn: 'root'
})
export class AutenticacionService {

  private router = inject(Router);
  private http = inject(HttpClient);

  private apiUrl = 'https://api-movil-85c1.onrender.com';
  private _autenticathed = new BehaviorSubject<boolean>(this.loadInitialAuthState());
  private _isGuest = new BehaviorSubject<boolean>(this.loadInitialGuestState());

  isAuthenticated$: Observable<boolean> = this._autenticathed.asObservable();
  isGuest$: Observable<boolean> = this._isGuest.asObservable();

  constructor() { 
    this.isAuthenticated$.pipe(
      tap((isAuthenticated) => {
        if (isAuthenticated) {
          this.router.navigate(['/tabs']);
        } else {
          this.router.navigate(['/login']);
        }
      })
    ).subscribe();
  }

  register(email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/register`;
    const body = { email, password };
    return this.http.post<{ token: string }>(url, body).pipe(
      tap(response => {
        this._autenticathed.next(true);
        this._isGuest.next(false);
        localStorage.setItem('token', response.token);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('isGuest', 'false');
        console.log('Registro exitoso');
      }),
      catchError(error => {
        console.error('Error en el registro:', error);
        return throwError(error);
      })
    );
  }

  login(email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/login`;
    const body = { email, password };
    console.log('***');
    
    return this.http.post<{ token: string }>(url, body).pipe(
      tap(response => {
        this._autenticathed.next(true);
        this._isGuest.next(false);
        localStorage.setItem('token', response.token); // Almacena el token en localStorage
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('isGuest', 'false');
      }),
      catchError(error => {
        console.error('Error en el inicio de sesión:', error);
        return throwError(error);
      })
    );
  }

  authenticateAsGuest() {
    this._autenticathed.next(true);
    this._isGuest.next(true);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('isGuest', 'true');
  }

  logout() {
    this._autenticathed.next(false);
    this._isGuest.next(false);
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('isGuest');
    this.router.navigate(['/autenticacion']);
  }

  private loadInitialAuthState(): boolean {
    return localStorage.getItem('isAuthenticated') === 'true';
  }

  private loadInitialGuestState(): boolean {
    return localStorage.getItem('isGuest') === 'true';
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  get isAuthenticated() {
    return this._autenticathed.getValue();
  }

  get isGuest() {
    return this._isGuest.getValue();
  }
}
