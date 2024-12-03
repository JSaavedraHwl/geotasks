import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({ 
  providedIn: 'root'
})
export class AutenticacionService {

  private apiUrl = 'https://ms-auth-geotasks-5ddd59e2c05a.herokuapp.com';

  private _isAuthenticated = new BehaviorSubject<boolean>(this.getFromLocalStorage('isAuthenticated', false));
  private _isGuest = new BehaviorSubject<boolean>(this.getFromLocalStorage('isGuest', false));

  isAuthenticated$: Observable<boolean> = this._isAuthenticated.asObservable();
  isGuest$: Observable<boolean> = this._isGuest.asObservable();

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.handleNavigationOnAuthState();
  }

  /** Registra un nuevo usuario */
  register(email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/register`;
    const body = { email, password };
    return this.http.post<{ token: string }>(url, body).pipe(
      tap(response => {
        this._isAuthenticated.next(true);
        this._isGuest.next(false);
        localStorage.setItem('token', response.token);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('isGuest', 'false');
        console.log('Registro exitoso');
      }),
      catchError(error => {
        // Asegura que el estado de autenticación no cambia en caso de error
        this._isAuthenticated.next(false);
        console.error('Error en el registro:', error);
        return throwError(() => error);
      })
    );
  }
  

  /** Inicia sesión con un usuario */
  login(email: string, password: string): Observable<any> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => this.handleAuthentication(response.token, false)),
      catchError(error => this.handleError('Error en el inicio de sesión', error))
    );
  }

  /** Autentica como invitado */
  authenticateAsGuest() {
    this.handleAuthentication(null, true);
  }

  /** Cierra sesión */
  logout() {
    this._isAuthenticated.next(false);
    this._isGuest.next(false);
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('isGuest');
    this.router.navigate(['/autenticacion']);
  }

  /** Obtiene el token de autenticación */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /** Estado actual de autenticación */
  get isAuthenticated(): boolean {
    return this._isAuthenticated.getValue();
  }

  /** Estado actual de invitado */
  get isGuest(): boolean {
    return this._isGuest.getValue();
  }

  /** Maneja la autenticación, ya sea para usuarios registrados o invitados */
  private handleAuthentication(token: string | null, isGuest: boolean) {
    this._isAuthenticated.next(true);
    this._isGuest.next(isGuest);
    if (token) localStorage.setItem('token', token);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('isGuest', isGuest ? 'true' : 'false');
  }

  /** Configura la navegación basada en el estado de autenticación */
  private handleNavigationOnAuthState() {
    this.isAuthenticated$.pipe(
      tap(isAuthenticated => {
        if (isAuthenticated) {
          this.router.navigate(['/tabs']);
        } else {
          this.router.navigate(['/login']);
        }
      })
    ).subscribe();
  }

  /** Carga un estado inicial desde localStorage */
  private getFromLocalStorage(key: string, defaultValue: boolean): boolean {
    return localStorage.getItem(key) === 'true' || defaultValue;
  }

  /** Manejo centralizado de errores */
  private handleError(message: string, error: any): Observable<never> {
    console.error(message, error);
    return throwError(error);
  }
}
