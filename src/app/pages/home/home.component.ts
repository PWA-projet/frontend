import { Component, OnInit } from '@angular/core';
import { Card } from 'primeng/card';
import { NgForOf } from '@angular/common';
import { DrawerComponent } from '../../../shared/components/drawer/drawer.component';
import { ChannelService}  from '../../../shared/services/channel.service';
import { ChannelI } from '../../../shared/models/channel.model';
import { Router } from '@angular/router';
import { APP_ROUTES } from '../../../shared/constants/routes';

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
export class HomeComponent implements OnInit {
  visible: boolean = false;
  channels: ChannelI[] = [];

  constructor(
    private channelService: ChannelService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadChannel();
  }

  loadChannel() {
    this.channelService.index().subscribe({
      next: (data: ChannelI[]) => {
        this.channels = data;
      },
      error: (error: any) => {
        console.error('Error fetching channel:', error);
      }
    });
  }

  // Toggle drawer visibility
  toggleDrawer() {
    this.visible = !this.visible;
  }

  goToProfile() {
    this.router.navigate([APP_ROUTES.PROFILE]);
  }

  goToChannel(channelId: string) {
    this.router.navigate([APP_ROUTES.CHANNEL.ID.replace(':id', channelId)]);
  }
}
