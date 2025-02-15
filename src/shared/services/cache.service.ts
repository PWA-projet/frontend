import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private cache = new Map<string, { data: any; expiration: number }>();
  private defaultCacheTime = 2 * 60 * 60 * 1000; // 2 heures

  set<T>(cacheKey: string, data: T, cacheTime: number = this.defaultCacheTime): void {
    const expiration = Date.now() + cacheTime;
    this.cache.set(cacheKey, { data, expiration });
  }

  get<T>(cacheKey: string): Observable<T | null> {
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() < cached.expiration) {
      return of(cached.data);
    }
    this.cache.delete(cacheKey);
    return of(null);
  }

  clear(cacheKey: string): void {
    this.cache.delete(cacheKey);
  }

  clearAll(): void {
    this.cache.clear();
  }
}
