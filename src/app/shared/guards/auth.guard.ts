import { inject } from '@angular/core';
import { CanMatchFn, CanActivateFn, Router } from '@angular/router';

export const authGuard: CanMatchFn = () => {
  const role = localStorage.getItem('role');
  const router = inject(Router);

  if (!role) {
    router.navigateByUrl('/login');
    return false;
  }

  return true;
};
export const bandOnlyGuard: CanMatchFn = () => {
  const role = localStorage.getItem('role');
  return role === 'band';
};

export const adminOnlyGuard: CanMatchFn = () => {
  const role = localStorage.getItem('role');
  return role === 'admin';
};


export const redirectPanelGuard: CanActivateFn = (route, state) => {
  const role = localStorage.getItem('role');
  const router = inject(Router);

  if (role === 'band') {
    router.navigateByUrl('/band-panel');
    return false;
  }

  if (role === 'admin') {
    router.navigateByUrl('/admin');
    return false;
  }

  return true;
};