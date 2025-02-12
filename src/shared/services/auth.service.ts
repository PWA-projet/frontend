import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.dev';
import { AuthLoginI, AuthRegisterI, AuthUserI } from '../models/auth.model';
import { JwtService } from "./jwt.service";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient, private JwtService: JwtService) {}

  register(credentials: AuthRegisterI): Observable<AuthRegisterI> {
    return this.http.post<AuthRegisterI>(`${this.apiUrl}/register`, credentials);
  }

  login(credentials: AuthLoginI): Observable<AuthRegisterI> {
    return this.http.post<AuthRegisterI>(`${this.apiUrl}/login`, credentials);
  }

  logout(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/logout`);
  }

  me(): Observable<AuthUserI> {
    return this.http.get<AuthUserI>(`${this.apiUrl}/me`);
  }

  handleLoginResponse(response: any) {
    this.JwtService.setToken(response.token.token);
  }
}
