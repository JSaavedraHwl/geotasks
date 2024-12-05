import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AutenticacionService } from '../servicios/autenticacion.service';

export const authenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AutenticacionService);
  const router = inject(Router);

  const token = authService.getToken();
  const isGuest = (authService.isAuthenticated && authService.isGuest)
  const isAuthenticated = (authService.isAuthenticated && token !== null);

  if (!isAuthenticated && !isGuest) {
    router.navigate(['/autenticacion']);
    return false;
  }
  return true;
};
