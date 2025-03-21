import { Component } from '@angular/core';
import { SkeletonModule, Skeleton } from 'primeng/skeleton';

@Component({
  selector: 'app-home-skeleton',
  imports: [
    SkeletonModule,
    Skeleton
  ],
  templateUrl: './home-skeleton.component.html',
  styleUrl: './home-skeleton.component.css'
})
export class HomeSkeletonComponent {

}
