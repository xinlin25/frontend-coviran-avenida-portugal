import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from './auth.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(Auth);
  const router = inject(Router);
  const token = localStorage.getItem('token');

  let authReq = req;

  const rutasPublicas = [
    '/auth/login',
    '/auth/register',
    '/auth/recuperar-password',
    '/auth/restablecer-password',
  ];

  const esRutaPublica = rutasPublicas.some((ruta) => req.url.includes(ruta));

  if (token && !esRutaPublica) {
    authReq = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + token,
      },
    });
  }

  return next(authReq).pipe(
    catchError((error) => {
      if (error.status === 401 && !esRutaPublica) {
        authService.logout();
        router.navigate(['/inicio-sesion']);
      }

      return throwError(() => error);
    }),
  );
};
