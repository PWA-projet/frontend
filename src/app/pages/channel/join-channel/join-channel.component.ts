import { Component } from '@angular/core';
import { InputText } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { Location } from '@angular/common';

@Component({
  selector: 'app-join-channel',
  imports: [
    InputText,
    FormsModule,
    Button
  ],
  templateUrl: './join-channel.component.html',
  styleUrl: './join-channel.component.css'
})
export class JoinChannelComponent {
  constructor(private location: Location) {}

  goToBack(): void {
    this.location.back();
  }
}
