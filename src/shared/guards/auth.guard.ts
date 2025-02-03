import { Injectable, inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { lastValueFrom } from 'rxjs';  // Import for async/await usage with observables

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  AuthService = inject(AuthService);
  router = inject(Router);

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {

    try {
      // Make the API request to get the user profile using 'lastValueFrom' to await the Observable
      const response = await lastValueFrom(this.AuthService.me());

      // Check for errors in the response, such as 'Unauthorized access'
      if (!response.email) {
        console.log('Token invalid ou expiré');
        await this.router.navigate(['/auth/login']);
        return false;
      }

      return true;

    } catch (err) {
      // Handle any unexpected errors (network issues, server errors)
      console.error('Erreur lors de la vérification du token', err);
      await this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
