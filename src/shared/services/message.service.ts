import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.dev';
import { MessageI } from '../models/message.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private apiUrl = `${environment.apiUrl}/channel`;

  constructor(private http: HttpClient) {}

  index(channelId: number): Observable<MessageI[]> {
    return this.http.get<MessageI[]>(`${this.apiUrl}/${channelId}/message`);
  }

  store(channelId: string, message: MessageI): Observable<MessageI> {
    return this.http.post<MessageI>(`${this.apiUrl}/${channelId}/message`, message);
  }
}
