import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {
  private apiUrl = `${environment.apiUrl}`;
  readonly VapidPublicKey = `${environment.VapidPublicKey}`; // Remplace avec ta clé publique

  constructor(private swPush: SwPush, private http: HttpClient) {}

  subscribeToPushNotifications() {
    if (!this.swPush.isEnabled) {
      console.log('Les notifications ne sont pas supportées');
      return;
    }

    this.swPush.requestSubscription({
      serverPublicKey: this.VapidPublicKey
    }).then(subscription => {
      // Envoie la souscription au backend
      this.http.post<any>(`${this.apiUrl}/subscribe-notification`, subscription).subscribe();
    }).catch(err => console.error('Erreur de souscription', err));
  }
}
