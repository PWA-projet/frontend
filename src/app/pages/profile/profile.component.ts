import { Component, OnInit } from '@angular/core';
import { AuthUserI } from '../../../shared/models/auth.model';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { Button } from 'primeng/button';
import {APP_ROUTES} from '../../../shared/constants/routes';

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
  isLoading: boolean = true;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile() {
    this.authService.me().subscribe({
      next: (response) => {
        this.auth = response;
      },
      error: (error: any) => {
        console.error('Failed to fetch user profile:', error);
      },
      complete: () => {
        this.isLoading = false;  // Arrête le chargement à la fin
      }
    });
  }

  logout() {
    return this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/auth/login']);
        console.log('Déconnexion réussie');
      },
      error: (error) => console.error('Erreur lors de la déconnexion', error)
    });
  }

  goToHome() {
    this.router.navigate([APP_ROUTES.HOME]);
  }
}
