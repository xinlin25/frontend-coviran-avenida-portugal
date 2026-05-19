import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from './auth.service';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(Auth);
  const router = inject(Router);
  const token = localStorage.getItem('token');

  let authReq = req;

  const rutasPublicas = [
    '/auth/login',
    '/auth/register',
    '/auth/refresh-token',
    '/auth/logout',
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
        const refreshToken = authService.obtenerRefreshToken();

        if (!refreshToken) {
          authService.limpiarSesion();
          router.navigate(['/inicio-sesion']);
          return throwError(() => error);
        }

        return authService.refrescarSesion().pipe(
          catchError((refreshError) => {
            authService.limpiarSesion();
            router.navigate(['/inicio-sesion']);

            return throwError(() => refreshError);
          }),
          switchMap((response) => {
            const retryReq = req.clone({
              setHeaders: {
                Authorization: 'Bearer ' + response.token,
              },
            });

            return next(retryReq);
          }),
        );
      }

      return throwError(() => error);
    }),
  );
};
