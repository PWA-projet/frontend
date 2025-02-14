import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChannelI } from '../../../shared/models/channel.model';
import { ChannelService } from '../../../shared/services/channel.service';
import { MessageService } from '../../../shared/services/message.service';
import { JwtService } from '../../../shared/services/jwt.service';
import { Card } from 'primeng/card';
import { ActivatedRoute } from '@angular/router';
import { Location, NgClass, NgForOf, NgIf } from '@angular/common';
import { MessageI } from '../../../shared/models/message.model';
import { InputText } from "primeng/inputtext";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Button } from 'primeng/button';
import { JwtI } from '../../../shared/models/jwt.model';

@Component({
  selector: 'app-channel',
  imports: [
    Card,
    NgIf,
    NgForOf,
    NgClass,
    InputText,
    ReactiveFormsModule,
    Button,
    FormsModule
  ],
  templateUrl: './channel.component.html',
  standalone: true,
  styleUrl: './channel.component.css'
})
export class ChannelComponent implements OnInit {
  @ViewChild('messageContainer') private messageContainer!: ElementRef;

  channel!: ChannelI;
  messages: MessageI[] = [];
  currentUser?: JwtI | null;
  newMessageContent: string = '';

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private channelService: ChannelService,
    private messageService: MessageService,
    private jwtService: JwtService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const channelId = params['id'];
      this.loadChannel(channelId);
      this.loadMessage(channelId);
    });
    this.currentUser = this.jwtService.getJwt();
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

  loadMessage(channelId: number) {
    this.messageService.index(channelId).subscribe({
      next: (data: MessageI[]) => {
        this.messages = data;
        this.scrollToBottom();
      },
      error: (error: any) => {
        console.error('Error fetching channel:', error);
      }
    });
  }

  sendMessage(channelId: number) {
    if (!this.newMessageContent.trim()) return;

    const newMessage: MessageI = {
      channelId: channelId,
      content: this.newMessageContent,
      createdAt: new Date().toISOString(),
      author: {
        id: this.currentUser?.id!,
        name: this.currentUser?.name!
      }
    };

    this.messages.push(newMessage); // Ajoute au tableau local
    this.scrollToBottom();
    this.newMessageContent = '';
  }

  scrollToBottom(): void {
    if (this.messageContainer) {
      setTimeout(() => {
        this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
      }, 100);
    }
  }

  goToBack(): void {
    this.location.back();
  }
}
