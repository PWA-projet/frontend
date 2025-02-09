import {Component, HostListener} from '@angular/core';
import { Card } from 'primeng/card';
import { NgClass, NgForOf } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    Card,
    NgForOf,
    NgClass,
  ],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.css'
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

  showDrawer() {
    this.visible = !this.visible;
    this.toggleOverlay();
  }

  // Ajouter une classe active à l'overlay pour assombrir l'écran
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

  // Ajouter un écouteur pour fermer le drawer si on clique en dehors du drawer
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const drawerElement = document.querySelector('.drawer');
    const addContentElement = document.querySelector('.add-content');

    // Si le clic est en dehors du drawer et du bouton "add content", on ferme le drawer
    if (this.visible && !drawerElement?.contains(event.target as Node) && !addContentElement?.contains(event.target as Node)) {
      this.visible = false;
      this.toggleOverlay();
    }
  }
}
