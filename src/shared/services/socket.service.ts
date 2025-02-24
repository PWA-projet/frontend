import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../environments/environment.dev';
import io from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: any;
  private messageSubject: Subject<any> = new Subject<any>();

  constructor() {
    this.socket = io(environment.apiUrl); // L'URL de ton serveur (ex: 'http://localhost:3000')
  }

  // S'abonner aux messages en temps réel
  subscribeToMessages(channelId: number) {
    this.socket.emit('join', { channelId }); // Demande au serveur d'abonner ce client à ce canal
    this.socket.on(`message/${channelId}`, (message: any) => {
      this.messageSubject.next(message); // Envoie le message au flux observable
    });
  }

  // Obtenir les messages en temps réel
  getMessages(): Subject<any> {
    return this.messageSubject;
  }
}
