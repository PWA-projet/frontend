import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.dev';
import { ChannelI } from '../models/channel.model';
import { Cacheable, CacheBuster, LocalStorageStrategy } from 'ts-cacheable';
import { cacheBuster$, CACHE_MAX_AGE } from '../constants/cache';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  private apiUrl = `${environment.apiUrl}/channel`;

  constructor(private http: HttpClient) {}

  @Cacheable({ cacheBusterObserver: cacheBuster$, storageStrategy: LocalStorageStrategy, maxAge: CACHE_MAX_AGE })
  index(): Observable<ChannelI[]> {
    return this.http.get<ChannelI[]>(`${this.apiUrl}`);
  }

  @CacheBuster({ cacheBusterNotifier : cacheBuster$ })
  create(channel: ChannelI): Observable<ChannelI> {
    return this.http.post<ChannelI>(`${this.apiUrl}`, channel);
  }

  @Cacheable({ cacheBusterObserver: cacheBuster$, storageStrategy: LocalStorageStrategy, maxAge: CACHE_MAX_AGE,
    maxCacheCount: 50,
  })
  show(id: string): Observable<ChannelI> {
    return this.http.get<ChannelI>(`${this.apiUrl}/${id}`);
  }

  @CacheBuster({ cacheBusterNotifier : cacheBuster$ })
  join(key: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/join`, key);
  }
}
