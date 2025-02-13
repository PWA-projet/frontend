import { inject } from '@angular/core';
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtService } from '../services/jwt.service';

export function JwtInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const jwtService = inject(JwtService);
  const jwt = jwtService.getJwt();

  // Clonage de la requête avec l'en-tête Authorization
  const modifiedReq = jwt
    ? req.clone({
      setHeaders: {
        Authorization: `Bearer ${jwt.token.token}`,
      },
    })
    : req;

  // Poursuite de la chaîne avec la requête modifiée
  return next(modifiedReq);
}

