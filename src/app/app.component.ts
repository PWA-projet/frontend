import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../shared/environments/environment.prod';
import { MyPreset } from './mytheme';
import {OfflineBannerComponent} from '../shared/components/offline-banner/offline-banner.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, OfflineBannerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor() {
    console.log(environment.production);
    console.log("" +
      " _____  _     _  _                 _     __    __   ___ \n" +
      "|_   _|| |_  (_)| |__  __ _  _  _ | |_  /  \\  /  \\ / _ \\\n" +
      "  | |  | ' \\ | || '_ \\/ _` || || ||  _|| () || () |\\_  /\n" +
      "  |_|  |_||_||_||_.__/\\__,_| \\_,_| \\__| \\__/  \\__/  /_/ \n" +
      "");
  }

  ngOnInit() {
    // Vérifier si MyPreset est bien défini avant d'appliquer la couleur primary
    if (MyPreset?.semantic?.primary?.[400]) {
      document.documentElement.style.setProperty('--primary-color', MyPreset.semantic.primary[400]);
    } else {
      console.error("MyPreset.semantic.primary[500] is undefined");
    }
  }
}
