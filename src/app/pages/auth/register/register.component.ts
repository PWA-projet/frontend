import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { AuthService } from '../../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { AuthRegisterI } from '../../../../shared/models/auth.model';
import { Password } from 'primeng/password';
import { InputText } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { Button } from 'primeng/button';
import { NgIf } from '@angular/common';
import {APP_ROUTES} from '../../../../shared/constants/routes';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    Password,
    InputText,
    Message,
    NgIf,
    Button
  ],
  templateUrl: './register.component.html',
  standalone: true,
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(12),
        this.specialCharacterValidator,
        this.upperCaseValidator,
        this.lowerCaseValidator
      ]],
      password_confirmation: ['', [Validators.required]]
    },
      { validators: this.passwordMatchValidator }
    );
  }

  // Validator pour les caractères spéciaux
  specialCharacterValidator(control: AbstractControl): ValidationErrors | null {
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(control.value);
    return hasSpecialCharacter ? null : { specialCharacter: true };
  }

  // Validator pour les majuscules
  upperCaseValidator(control: AbstractControl): ValidationErrors | null {
    const hasUpperCase = /[A-Z]/.test(control.value);
    return hasUpperCase ? null : { upperCase: true };
  }

  // Validator pour les minuscules
  lowerCaseValidator(control: AbstractControl): ValidationErrors | null {
    const hasLowerCase = /[a-z]/.test(control.value);
    return hasLowerCase ? null : { lowerCase: true };
  }

  // Validator pour la comfirmation du password
  passwordMatchValidator(formGroup: FormGroup): ValidationErrors | null {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('password_confirmation')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  register() {
    if (this.registerForm.valid) {
      const newUser: AuthRegisterI = this.registerForm.value;

      this.authService.register(newUser).subscribe({
        next: (response) => {
          console.log("Account successfully created : ", response.name);
          this.goToLogin();
        },
        error: (error) => console.error('Registration failed:', error)
      });
    } else {
      console.error('Form is invalid');
    }
  }

  goToLogin() {
    this.router.navigate([APP_ROUTES.AUTH.LOGIN]);
  }
}
