import { Component, OnInit } from '@angular/core';
import { ChannelI } from '../../../shared/models/channel.model';
import { ChannelService } from '../../../shared/services/channel.service';
import { Card } from 'primeng/card';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-channel',
  imports: [
    Card,
  ],
  templateUrl: './channel.component.html',
  styleUrl: './channel.component.css'
})
export class ChannelComponent implements OnInit {
  channel!: ChannelI;

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
        console.log(this.channel);
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
