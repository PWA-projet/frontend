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
      console.log('✅ Connecté au serveur WebSocket !');
    });

    // 🔹 Afficher tous les événements WebSocket reçus
    this.socket.onAny((event, ...args) => {
      console.log(`📩 Événement WebSocket reçu: ${event}`, args);
    });

    this.socket.on('newMessage', (message) => {
      console.log('📥 Nouveau message reçu via WebSocket:', message);
    });
  }

  /**
   * Rejoint un canal spécifique
   */
  joinChannel(channelId: string): void {
    console.log(`🔹 Demande de rejoindre le canal: ${channelId}`);
    this.socket.emit("joinChannel", channelId);

    // Vérifier que le serveur répond
    this.socket.on("joinedChannel", (data) => {
      console.log(`✅ Confirmation: L'utilisateur a bien rejoint le canal ${data.channelId}`);
    });
  }

  /**
   * Écoute les nouveaux messages reçus via WebSocket
   */
  receiveMessages(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('newMessage', (message) => {
        console.log('📥 Nouveau message reçu:', message); // Vérifie si ça s'affiche
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
