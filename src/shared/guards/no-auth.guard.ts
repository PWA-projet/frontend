import { Injectable, inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { lastValueFrom } from 'rxjs';  // Import for async/await usage with observables

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard {
  AuthService = inject(AuthService);
  router = inject(Router);

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {

    try {
      // Make the API request to get the user profile using 'lastValueFrom' to await the Observable
      const response = await lastValueFrom(this.AuthService.me());

      // Check for errors in the response, such as 'authorized access'
      if (response.email) {
        console.log('Utilisateur connecté avec un token valide');
        await this.router.navigate(['/']);
        return false;
      }

      return true;

    } catch (err) {
      // Handle any unexpected errors (network issues, server errors)
      console.error('Erreur lors de la vérification du token', err);
      return true;
    }
  }
}
