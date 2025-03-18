import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { MessageI } from '../models/message.model';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private readonly socket: Socket;

  constructor() {
    this.socket = io(environment.apiUrl, {
      transports: ["websocket"],
    });

    this.socket.on('connect', () => {
      console.log('✅ Connecté au serveur WebSocket !');
    });

    this.socket.on('connect_error', (err) => {
      console.error('🚨 Erreur de connexion WebSocket:', err);
    });
  }

  joinChannel(channelId: string): void {
    console.log(`📡 Rejoindre le canal: ${channelId}`);
    this.socket.emit("joinChannel", channelId);
  }

  receiveMessages(): Observable<MessageI> {
    return new Observable(observer => {
      this.socket.on('newMessage', (message) => {
        observer.next(message);
      });
    });
  }

  sendMessage(message: MessageI): void {
    this.socket.emit('newMessage', message);
  }
}
