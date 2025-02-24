import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.dev';
import { Observable } from 'rxjs';
import { MessageI } from '../models/message.model';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private readonly socket: Socket;

  constructor() {
    this.socket = io(environment.apiUrl);
    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server!');
    });
  }

  /**
   * Rejoint un canal spécifique
   */
  joinChannel(channelId: string): void {
    console.log('🔹 Rejoindre le canal:', channelId);
    this.socket.emit('joinChannel', channelId);
  }

  /**
   * Écoute les nouveaux messages reçus via WebSocket
   */
  receiveMessages(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('newMessage', (message) => {
        console.log('Received message:', message);
        observer.next(message);
      });
    });
  }

  /**
   * Envoie un message au serveur WebSocket
   */
  sendMessage(message: MessageI): void {
    console.log('📤 Envoi du message:', message);
    this.socket.emit('newMessage', message);
  }
}
