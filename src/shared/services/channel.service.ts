import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { environment } from '../environments/environment.dev';
import { ChannelI } from '../models/channel.model';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  private apiUrl = `${environment.apiUrl}/channel`;
  private indexCacheKey = 'channelIndex';

  constructor(private http: HttpClient, private cacheService: CacheService) {}

  index(): Observable<ChannelI[]> {
    return this.cacheService.get<ChannelI[]>(this.indexCacheKey).pipe(
      map((cachedData) => cachedData ?? []),
      switchMap((cachedData) =>
        cachedData.length > 0
          ? of(cachedData)
          : this.http.get<ChannelI[]>(this.apiUrl).pipe(
            tap((data) => this.cacheService.set(this.indexCacheKey, data)) // Met en cache
          )
      )
    );
  }

  create(channel: ChannelI): Observable<ChannelI> {
    return this.http.post<ChannelI>(this.apiUrl, channel).pipe(
      tap(() => this.cacheService.clear(this.indexCacheKey)) // Invalide le cache après une modification
    );
  }

  show(id: number): Observable<ChannelI> {
    const showCacheKey = `channelShow-${id}`;

    return this.cacheService.get<ChannelI>(showCacheKey).pipe(
      switchMap((cachedData) =>
        cachedData
          ? of(cachedData) // Retourne le cache s'il existe
          : this.http.get<ChannelI>(`${this.apiUrl}/${id}`).pipe(
            tap((data) => this.cacheService.set(showCacheKey, data)) // Met en cache
          )
      )
    );
  }

  join(key: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/join`, key).pipe(
      tap(() => this.cacheService.clear(this.indexCacheKey)) // Invalide le cache des channels
    );
  }
}
