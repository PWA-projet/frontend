import { Component, OnInit } from '@angular/core';
import { ChannelI } from '../../../shared/models/channel.model';
import { ChannelService } from '../../../shared/services/channel.service';
import { Card } from 'primeng/card';
import { ActivatedRoute } from '@angular/router';
import {Location, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-channel',
  imports: [
    Card,
    NgIf,
    NgForOf,
  ],
  templateUrl: './channel.component.html',
  styleUrl: './channel.component.css'
})
export class ChannelComponent implements OnInit {
  channel!: ChannelI;
  messages = [
    { name: 'Alice', text: 'Bonjour tout le monde!' },
    { name: 'Bob', text: 'Comment ça va ?' },
    { name: 'Charlie', text: 'Ceci est un message test.' },
    { name: 'David', text: 'Long message qui ne doit pas dépasser de la carte. Long message qui ne doit pas dépasser de la carte.' },
    { name: 'Eve', text: 'Un autre message pour voir l’affichage.' }
  ];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private channelService: ChannelService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const channelId = params['id'];
      this.loadChannel(channelId);
    });
  }

  loadChannel(channelId: number) {
    this.channelService.show(channelId).subscribe({
      next: (data: ChannelI) => {
        this.channel = data;
      },
      error: (error: any) => {
        console.error('Error fetching channel:', error);
      }
    });
  }

  goToBack(): void {
    this.location.back();
  }
}
