import { Component, OnInit } from '@angular/core';
import { ChannelI } from '../../../../shared/models/channel.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ChannelService } from '../../../../shared/services/channel.service';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { APP_ROUTES } from '../../../../shared/constants/routes';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ClipboardModule, Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-setting-channel',
  imports: [
    NgIf,
    NgForOf,
    Button,
    InputText,
    FormsModule,
    ClipboardModule,
    NgClass
  ],
  templateUrl: './setting-channel.component.html',
  styleUrl: './setting-channel.component.css'
})
export class SettingChannelComponent implements OnInit {
  channel!: ChannelI;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private channelService: ChannelService,
    private clipboard: Clipboard
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const channelId = params['id'];
      this.loadChannel(channelId);
    });
  }

  loadChannel(channelId: string) {
    this.isLoading = true;
    this.channelService.show(channelId).subscribe({
      next: (data: ChannelI) => {
        this.channel = data;
      },
      error: (error: any) => {
        console.error('Error fetching channel:', error);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  copyChannelKey(key: string) {
    this.clipboard.copy(key);
    alert('Clé copiée dans le presse-papiers !');
  }

  goToChannel(channelId: string) {
    this.router.navigate([APP_ROUTES.CHANNEL.ID.replace(':id', String(channelId))]);
  }
}
