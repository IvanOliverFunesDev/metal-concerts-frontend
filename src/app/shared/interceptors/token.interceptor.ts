import { HttpInterceptorFn } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  // Verificamos si estamos en el navegador
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    console.log(token);

    // Clonamos la petición
    let modifiedReq = req.clone();

    // Si hay token, añadimos el encabezado Authorization
    if (token) {
      modifiedReq = modifiedReq.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next(modifiedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.warn('⚠️ No hay token disponible o token inválido. Continuando sin autenticación.');
          return throwError(() => new Error('Unauthorized')); // Error 401
        }
        return throwError(() => error); // Deja pasar los demás errores
      })
    );
  } else {
    // Si no estamos en el navegador, simplemente pasamos la petición sin modificarla
    return next(req);
  }
};
