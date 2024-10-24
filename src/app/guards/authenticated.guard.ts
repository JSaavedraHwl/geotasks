import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AutenticacionService } from '../servicios/autenticacion.service';

export const authenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AutenticacionService);
  const router = inject(Router);
  const isAuthenticted =  authService.isAuthenticated;
  if(!isAuthenticted) {
    router.navigate(['autenticacion']);
    return false;
  }
  return true;
};
