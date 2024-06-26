import { CanActivateFn } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  console.log(AuthService.getAuth());
  return AuthService.getAuth();
};

export const guestGuard: CanActivateFn = (route, state) => {
  return !AuthService.getAuth();
};
