import {CanActivateChildFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

export const authGuard: CanActivateChildFn = (childRoute, state) => {
  const router: Router = inject(Router);
  const cookieService: CookieService = inject(CookieService);
  const isAuthenticated = cookieService.check('token');

  if (state.url === '/') {
    return true;
  }

  // Se l'utente non è autenticato, reindirizza al login
  if (!isAuthenticated) {
    router.navigate(['/login']);
    return false;
  }

  const token = cookieService.get('token');

  // Controllo se il token è scaduto
  if (isTokenExpired(token)) {
    cookieService.delete('token'); // Rimuove il token scaduto
    cookieService.delete('utente'); //Rimuove l'utente
    router.navigate(['/login']);
    return false;
  }

  return true;

  // Funzione per controllare la scadenza del token
  function isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica il payload del JWT
      const expiry = payload.exp * 1000; // Converti il tempo di scadenza in millisecondi
      return Date.now() > expiry;
    } catch (error) {
      return true; // Se il token non è valido, consideralo scaduto
    }
  }
};
