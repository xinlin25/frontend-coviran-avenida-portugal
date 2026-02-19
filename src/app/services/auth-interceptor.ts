import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token  = localStorage.getItem("token");
  
  //Si no hay token, enviamos una peticion normal
  if (!token) {
    return next(req);
  }

  //Clonamos la petición y añadimos el header Authorization
  const authRequest = req.clone({
    setHeaders: {
      Authorization: "Bearer " + token
    }
  });

  return next(authRequest);
};
