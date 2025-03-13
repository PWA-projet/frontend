import { Component, OnInit } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { DrawerComponent } from '../../../shared/components/drawer/drawer.component';
import { ChannelService}  from '../../../shared/services/channel.service';
import { ChannelI } from '../../../shared/models/channel.model';
import { Router } from '@angular/router';
import { APP_ROUTES } from '../../../shared/constants/routes';
import { Button } from 'primeng/button';
import { HomeSkeletonComponent } from '../../../shared/components/skeletons/home-skeleton/home-skeleton.component';

@Component({
  selector: 'app-home',
  imports: [
    NgForOf,
    DrawerComponent,
    Button,
    NgIf,
    HomeSkeletonComponent
  ],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  visible: boolean = false;
  channels: ChannelI[] = [];
  isLoading: boolean = true;

  constructor(
    private channelService: ChannelService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadChannel();
  }

  loadChannel() {
    this.channelService.index().subscribe({
      next: (data: ChannelI[]) => {
        this.channels = data;
      },
      error: (error: any) => {
        console.error('Error fetching channels:', error);
      },
      complete: () => {
        this.isLoading = false;  // Arrête le chargement à la fin
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
    this.router.navigate([APP_ROUTES.CHANNEL.ID.replace(':id', String(channelId))]);
  }
}
