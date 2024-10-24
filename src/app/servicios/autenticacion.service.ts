import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, Subject, tap } from 'rxjs';

@Injectable({ 
  providedIn: 'root'
})
export class AutenticacionService {

  private router = inject(Router)
  
  private _autenticathed = new BehaviorSubject(false);
  private isAuthenticated$: Observable<boolean>;
  constructor() { 
    this.isAuthenticated$ = this._autenticathed.asObservable();
    this.isAuthenticated$.pipe(
      tap((value)=> {
        console.log('ha cambiado el valor de authenticated :D', value)
        if(value) {
          this.router.navigate(['/tabs'])
        }
      })
    ).subscribe();
  }

  authenticate(valor: boolean) {
    this._autenticathed.next(valor)
  }
  get isAuthenticated() {
    return this._autenticathed.getValue();
  }
}
