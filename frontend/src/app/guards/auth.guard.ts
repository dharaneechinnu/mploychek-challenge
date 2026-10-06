import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

// Requires a valid token; restores the user profile after a page refresh.
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const users = inject(UserService);

  if (!auth.isLoggedIn()) return router.createUrlTree(['/login']);
  if (auth.user()) return true;

  return users.me().pipe(
    map((user) => { auth.user.set(user); return true; }),
    catchError(() => { auth.logout(); return of(false); }),
  );
};

export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  return auth.isAdmin() ? true : inject(Router).createUrlTree(['/dashboard']);
};

// Keeps signed-in users away from the login page.
export const guestGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  return auth.isLoggedIn() ? inject(Router).createUrlTree(['/dashboard']) : true;
};
