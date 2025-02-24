import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.dev';
import { Observable } from 'rxjs';
import { MessageI } from '../models/message.model';
import io, { Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io(environment.apiUrl);
  }

  joinChannel(channelId: string): void {
    this.socket.emit('joinChannel', channelId);
  }

  receiveMessages(): Observable<MessageI> {
    return new Observable(observer => {
      this.socket.on('newMessage', (message) => {
        observer.next(message);
      });
    });
  }

  sendMessage(createMessageDto: MessageI): void {
    this.socket.emit('newMessage', createMessageDto);
  }
}
