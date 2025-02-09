import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-channel',
  imports: [],
  templateUrl: './create-channel.component.html',
  styleUrl: './create-channel.component.css'
})
export class CreateChannelComponent {
  constructor(private location: Location) {}

  goToBack(): void {
    this.location.back();
  }
}
