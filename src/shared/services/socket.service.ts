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

    this.socket.on('connect', () => {
      console.log('✅ Socket connecté:', this.socket.id);
    });

    this.socket.on('disconnect', () => {
      console.log('❌ Socket déconnecté');
    });

    this.socket.on('connect_error', (err) => {
      console.error('🚨 Erreur de connexion Socket.io:', err);
    });
  }

  joinChannel(channelId: string): void {
    // Join the channel by emitting a 'joinChannel' event
    console.log('User joined channel:', channelId);
    this.socket.emit('joinChannel', channelId);
  }

  receiveMessages(): Observable<MessageI> {
    return new Observable(observer => {
      this.socket.on('newMessage', (message: MessageI) => {
        console.log('📩 Nouveau message reçu via WebSocket:', message);
        observer.next(message);
      });
    });
  }

  sendMessage(createMessageDto: MessageI): void {
    console.log('📤 Envoi du message via WebSocket:', createMessageDto);
    this.socket.emit('newMessage', createMessageDto);
  }
}
