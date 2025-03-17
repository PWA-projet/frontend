import { Component, OnInit } from '@angular/core';
import { NetworkStatusService } from '../../services/network-status.service';
import { NgIf } from '@angular/common';
import { Message } from 'primeng/message';

@Component({
  selector: 'app-offline-banner',
  imports: [
    NgIf,
    Message,
  ],
  templateUrl: './offline-banner.component.html',
  styleUrl: './offline-banner.component.css'
})
export class OfflineBannerComponent implements OnInit{
  isOffline: boolean = false;

  constructor(private networkStatusService: NetworkStatusService) {}

  ngOnInit(): void {
    this.networkStatusService.onlineStatus$.subscribe(
      (status) => (this.isOffline = !status)
    );
    if (this.isOffline) {
      console.log('offline');
    }
  }
}
