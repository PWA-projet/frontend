import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.dev';
import { ChannelI } from '../models/channel.model';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  private apiUrl = `${environment.apiUrl}/channel`;

  constructor(private http: HttpClient) {}

  index(): Observable<ChannelI[]> {
    return this.http.get<ChannelI[]>(`${this.apiUrl}`);
  }

  create(channel: ChannelI): Observable<ChannelI> {
    return this.http.post<ChannelI>(`${this.apiUrl}`, channel);
  }

  join(key: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/join`, key);
  }
}
