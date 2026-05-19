import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '../services/auth/auth.service';

export const clienteGuard: CanActivateFn = () => {
  const auth = inject(Auth);
  const router = inject(Router);

  if (auth.esAdminOEmpleado()) {
    return router.createUrlTree(['/']);
  }

  return true;
};
