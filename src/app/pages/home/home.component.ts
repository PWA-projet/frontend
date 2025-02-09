import { Component } from '@angular/core';
import { Card } from 'primeng/card';
import { NgForOf } from '@angular/common';
import { DrawerComponent } from '../../../shared/components/drawer/drawer.component';

@Component({
  selector: 'app-home',
  imports: [
    Card,
    NgForOf,
    DrawerComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  visible: boolean = false;

  channels = [
    { name: 'CGN 11/11' },
    { name: 'CGN 12/11' },
    { name: 'CGN 13/11' },
    { name: 'CGN 14/11' },
    { name: 'CGN 15/11' },
    { name: 'CGN 15/11' },
    { name: 'CGN 15/11' },
    { name: 'CGN 15/11' },
  ];

  // Toggle drawer visibility
  toggleDrawer() {
    this.visible = !this.visible;  // Just toggle the visibility state
  }
}
