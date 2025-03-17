import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {
  private apiUrl = `${environment.apiUrl}`;
  readonly VAPID_PUBLIC_KEY = 'BLSc8h04RqXb20KhjXaWMTFTL3hD0NXZ8r19TUWvt_NIkGo4zrEdhw4vUw2ZxraXOxNfJmoi8rrU4bHfFJD3H_s'; // Remplace avec ta clé publique

  constructor(private swPush: SwPush, private http: HttpClient) {}

  subscribeToPushNotifications() {
    console.log('subscribeToPushNotifications')
    if (!this.swPush.isEnabled) {
      console.log('Les notifications ne sont pas supportées');
      return;
    }

    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    }).then(subscription => {
      console.log('Subscription:', subscription);
      // Envoie la souscription au backend
      this.http.post<any>(`${this.apiUrl}/subscribe-notification`, subscription).subscribe();
    }).catch(err => console.error('Erreur de souscription', err));
  }
}
