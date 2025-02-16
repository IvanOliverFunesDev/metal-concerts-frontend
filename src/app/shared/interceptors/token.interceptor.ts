import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService);
  const token = cookieService.get('token');

  // Clonamos la petición con withCredentials, pero sin bloquearla si no hay token
  let modifiedReq = req.clone({
    withCredentials: true
  });

  // Si hay token, añadimos el encabezado Authorization
  if (token) {
    modifiedReq = modifiedReq.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  console.log('⏩ Interceptando petición:', modifiedReq);

  return next(modifiedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        console.warn('⚠️ No hay token disponible. Continuando sin autenticación.');
        return EMPTY; // Evita que el error rompa la app
      }
      return EMPTY;
    })
  );
};
