import { Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';
import { Skeleton } from "primeng/skeleton";

@Component({
  selector: 'app-channel-skeleton',
  imports: [
    SkeletonModule,
    Skeleton,
  ],
  templateUrl: './channel-skeleton.component.html',
  styleUrl: './channel-skeleton.component.css'
})
export class ChannelSkeletonComponent {

}
