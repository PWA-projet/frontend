import { Component, HostListener, Input, OnChanges, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Card } from "primeng/card";
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import {APP_ROUTES} from '../../constants/routes';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  imports: [
    Card,
    NgClass
  ],
  styleUrls: ['./drawer.component.css']
})
export class DrawerComponent implements OnChanges {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>(); // Emit visibility change

  constructor(
    private router: Router
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible']) {
      this.toggleOverlay();  // Adjust the dark background
    }
  }

  // Handle the display of the dark background and interaction
  toggleOverlay() {
    const overlay = document.querySelector('.page-overlay');
    const body = document.body;

    if (this.visible) {
      overlay?.classList.add('active');
      body.classList.add('page-no-interactions');
    } else {
      overlay?.classList.remove('active');
      body.classList.remove('page-no-interactions');
    }
  }

  // Close the drawer if clicking outside
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const drawerElement = document.querySelector('.drawer');
    const addContentElement = document.querySelector('.add-content');

    // If the click is outside the drawer and the "add content" button, close the drawer
    if (this.visible && !drawerElement?.contains(event.target as Node) && !addContentElement?.contains(event.target as Node)) {
      this.visible = false;
      this.visibleChange.emit(this.visible); // Emit the updated visibility state
      this.toggleOverlay();  // Update the dark background state
    }
  }

  createChannel() {
    this.router.navigate([APP_ROUTES.CHANNEL.CREATE]);
  }

  JoinChannel() {
    this.router.navigate([APP_ROUTES.CHANNEL.JOIN]);
  }
}
