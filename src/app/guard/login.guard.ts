import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {

  const localUser = localStorage.getItem('authToken');
  const router = inject(Router);

  if (localUser != null) {
    router.navigateByUrl('/master');
    return false;
  } else {
    return true;
  }
};
