import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '../services/auth/auth.service';

export const adminGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);

  const rol = auth.getRol();

  if (rol === 'ADMIN' || rol === 'EMPLEADO') {
    return true;
  }

  return router.createUrlTree(['/']);
};
