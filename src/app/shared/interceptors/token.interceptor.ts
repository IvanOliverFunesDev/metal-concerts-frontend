import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';


export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService);
  const token = cookieService.get('token');
  if (token) {
    req = req.clone({
      withCredentials: true
    })
  }
  console.log(req);
  return next(req);
};
