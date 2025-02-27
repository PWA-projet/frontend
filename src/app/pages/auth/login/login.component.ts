import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { AuthLoginI } from '../../../../shared/models/auth.model';
import { Password } from 'primeng/password';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { APP_ROUTES } from '../../../../shared/constants/routes';
import { Card } from 'primeng/card';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    Password,
    InputText,
    Button,
    Card
  ],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    if (this.loginForm.valid) {
      const credentials: AuthLoginI = this.loginForm.value;

      this.authService.login(credentials).subscribe({
        next: (response) => {
          this.authService.handleLoginResponse(response);
          this.goToHome();
        },
        error: (error) => console.error('login failed:', error)
      });
    } else {
      console.error('Form is invalid');
    }
  }

  goToRegister() {
    this.router.navigate([APP_ROUTES.AUTH.REGISTER]);
  }

  goToHome() {
    this.router.navigate([APP_ROUTES.HOME]);
  }
}
