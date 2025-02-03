import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  private TokenKey = 'token';

  setToken(token: string): void {
    localStorage.setItem(this.TokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TokenKey);
  }

  clearTokens(): void {
    localStorage.removeItem(this.TokenKey);
  }
}
