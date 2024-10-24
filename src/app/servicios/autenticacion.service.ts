import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ 
  providedIn: 'root'
})
export class AutenticacionService {

  private router = inject(Router);
  private _autenticathed = new BehaviorSubject<boolean>(this.loadInitialAuthState());
  private _isGuest = new BehaviorSubject<boolean>(this.loadInitialGuestState());
  private isAuthenticated$: Observable<boolean>;
  private isGuest$: Observable<boolean>;

  constructor() { 
    this.isAuthenticated$ = this._autenticathed.asObservable();
    this.isGuest$ = this._isGuest.asObservable();

    // Subscribe to authentication state changes
    this.isAuthenticated$.pipe(
      tap((isAuthenticated) => {
        console.log('Estado de autenticación ha cambiado:', isAuthenticated);
        if (isAuthenticated) {
          // Si el usuario está autenticado, redirigir a la página principal
          this.router.navigate(['/tabs']);
        } else {
          // Si no está autenticado, redirigir a la página de inicio de sesión
          this.router.navigate(['/login']);
        }
      })
    ).subscribe();
  }

  // Método para autenticar como usuario registrado
  authenticate() {
    this._autenticathed.next(true);
    this._isGuest.next(false);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('isGuest', 'false');
  }

  // Método para autenticar como invitado
  authenticateAsGuest() {
    this._autenticathed.next(true);
    this._isGuest.next(true);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('isGuest', 'true');
  }

  // Método para cerrar sesión
  logout() {
    this._autenticathed.next(false);
    this._isGuest.next(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('isGuest');
    this.router.navigate(['/login']);
  }

  // Método para cargar el estado inicial de autenticación desde localStorage
  private loadInitialAuthState(): boolean {
    return localStorage.getItem('isAuthenticated') === 'true';
  }

  // Método para cargar el estado inicial de usuario invitado desde localStorage
  private loadInitialGuestState(): boolean {
    return localStorage.getItem('isGuest') === 'true';
  }

  // Getter para saber si el usuario está autenticado
  get isAuthenticated() {
    return this._autenticathed.getValue();
  }

  // Getter para saber si el usuario es un invitado
  get isGuest() {
    return this._isGuest.getValue();
  }
}
