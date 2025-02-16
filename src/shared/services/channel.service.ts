import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../environments/environment.dev';
import { ChannelI } from '../models/channel.model';
import { Cacheable, CacheBuster } from 'ts-cacheable';

const cacheBuster$ = new Subject<void>();

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  private apiUrl = `${environment.apiUrl}/channel`;

  constructor(private http: HttpClient) {}

  @Cacheable({ cacheBusterObserver: cacheBuster$ })
  index(): Observable<ChannelI[]> {
    return this.http.get<ChannelI[]>(`${this.apiUrl}`);
  }

  @CacheBuster({ cacheBusterNotifier : cacheBuster$ })
  create(channel: ChannelI): Observable<ChannelI> {
    return this.http.post<ChannelI>(`${this.apiUrl}`, channel);
  }

  @Cacheable({ cacheBusterObserver: cacheBuster$})
  show(id: number): Observable<ChannelI> {
    return this.http.get<ChannelI>(`${this.apiUrl}/${id}`);
  }

  @CacheBuster({ cacheBusterNotifier : cacheBuster$ })
  join(key: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/join`, key);
  }
}
