import { Injectable } from '@angular/core';
import {JwtI} from '../models/jwt.model';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  private jwtKey = 'jwt';

  setJwt(jwt: JwtI): void {
    localStorage.setItem(this.jwtKey, JSON.stringify(jwt));
  }

  getJwt(): JwtI | null {
    const jwtString = localStorage.getItem(this.jwtKey);
    return jwtString ? JSON.parse(jwtString) : null;
  }

  clearJwt(): void {
    localStorage.removeItem(this.jwtKey);
  }
}
