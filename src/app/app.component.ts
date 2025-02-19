import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../shared/environments/environment.prod';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor() {
    console.log(environment.production);
    console.log("" +
      " _____  _     _  _                 _     __    __   ___ \n" +
      "|_   _|| |_  (_)| |__  __ _  _  _ | |_  /  \\  /  \\ / _ \\\n" +
      "  | |  | ' \\ | || '_ \\/ _` || || ||  _|| () || () |\\_  /\n" +
      "  |_|  |_||_||_||_.__/\\__,_| \\_,_| \\__| \\__/  \\__/  /_/ \n" +
      "");
  }
}
