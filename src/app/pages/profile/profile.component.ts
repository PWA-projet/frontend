import { Component, OnInit } from '@angular/core';
import { AuthUserI } from '../../../shared/models/auth.model';
import { AuthService } from '../../../shared/services/auth.service';
import { JwtService } from '../../../shared/services/jwt.service';
import { CacheService } from '../../../shared/services/cache.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-profile',
  imports: [
    NgIf,
    Button
  ],
  templateUrl: './profile.component.html',
  standalone: true,
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  auth!: AuthUserI;

  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    private cacheService: CacheService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.me().subscribe({
      next: (response) => {
        this.auth = response;
      },
      error: (error) => console.error('Failed to fetch user profile:', error)
    });
  }

  logout() {
    return this.authService.logout().subscribe({
      next: () => {
        this.jwtService.clearJwt();
        this.cacheService.clearAll();
        this.router.navigate(['/auth/login']);
        console.log('Déconnexion réussie');
      },
      error: (error) => console.error('Erreur lors de la déconnexion', error)
    });
  }
}
