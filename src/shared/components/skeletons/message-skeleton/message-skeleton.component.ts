import { Component } from '@angular/core';
import { SkeletonModule, Skeleton } from 'primeng/skeleton';

@Component({
  selector: 'app-message-skeleton',
  imports: [
    SkeletonModule,
    Skeleton
  ],
  templateUrl: './message-skeleton.component.html',
  styleUrl: './message-skeleton.component.css'
})
export class MessageSkeletonComponent {

}
