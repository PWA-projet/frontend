import { Component, HostListener, Input, OnChanges, OnInit, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { APP_ROUTES } from '../../constants/routes';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  imports: [
    NgClass,
    Button,
  ],
  styleUrls: ['./drawer.component.css']
})
export class DrawerComponent implements OnInit, OnChanges {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  constructor(private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      const drawer = document.querySelector('.drawer');
      if (drawer) {
        drawer.classList.add('visible');
      }
    }, 0);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['visible']) {
      this.toggleOverlay();
    }
  }

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

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const drawerElement = document.querySelector('.drawer');
    const addContentElement = document.querySelector('.add-content');

    if (this.visible && !drawerElement?.contains(event.target as Node) && !addContentElement?.contains(event.target as Node)) {
      this.visible = false;
      this.visibleChange.emit(this.visible);
      this.toggleOverlay();
    }
  }

  createChannel() {
    this.router.navigate([APP_ROUTES.CHANNEL.CREATE]);
  }

  JoinChannel() {
    this.router.navigate([APP_ROUTES.CHANNEL.JOIN]);
  }
}
