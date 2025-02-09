import { Component } from '@angular/core';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    Card,
    Button,
    NgForOf
  ],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.css'
})
export class HomeComponent {
  channels = [
    { name: 'CGN 11/11' },
    { name: 'CGN 12/11' },
    { name: 'CGN 13/11' },
    { name: 'CGN 14/11' },
    { name: 'CGN 15/11' }
  ];
}
