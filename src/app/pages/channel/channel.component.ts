import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChannelI } from '../../../shared/models/channel.model';
import { ChannelService } from '../../../shared/services/channel.service';
import { MessageService } from '../../../shared/services/message.service';
import { JwtService } from '../../../shared/services/jwt.service';
import { SocketService } from '../../../shared/services/socket.service';
import { Card } from 'primeng/card';
import { ActivatedRoute, Router } from '@angular/router';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { MessageI } from '../../../shared/models/message.model';
import { InputText } from "primeng/inputtext";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Button } from 'primeng/button';
import { JwtI } from '../../../shared/models/jwt.model';
import { APP_ROUTES } from '../../../shared/constants/routes';
import { ChannelSkeletonComponent } from '../../../shared/components/skeletons/channel-skeleton/channel-skeleton.component';
import { MessageSkeletonComponent } from '../../../shared/components/skeletons/message-skeleton/message-skeleton.component';
import { DialogModule } from 'primeng/dialog';

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
    FormsModule,
    ChannelSkeletonComponent,
    MessageSkeletonComponent,
    DialogModule
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

  isLoadingChannel: boolean = true;
  isLoadingMessage: boolean = true;

  displayPopup: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private channelService: ChannelService,
    private messageService: MessageService,
    private jwtService: JwtService,
    private socketService: SocketService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const channelId = params['id'];
      this.loadChannel(channelId);
      this.loadMessage(channelId);

      // 🔹 Joindre le canal WebSocket
      this.socketService.joinChannel(channelId);

      // 🔹 Vérifier que l'écoute fonctionne
      this.socketService.receiveMessages().subscribe((message: MessageI) => {
        if (message.channelId === this.channel.id) {
          this.messages.push(message);
          this.scrollToBottom();
        }
      });
    });

    this.currentUser = this.jwtService.getJwt();
  }

  loadChannel(channelId: string) {
    this.isLoadingChannel = true;
    this.channelService.show(channelId).subscribe({
      next: (data: ChannelI) => {
        this.channel = data;
      },
      error: (error: any) => {
        console.error('Error fetching channel:', error);
      },
      complete: () => {
        this.isLoadingChannel = false;
      }
    });
  }

  loadMessage(channelId: string) {
    this.isLoadingMessage = true;
    this.messageService.index(channelId).subscribe({
      next: (data: MessageI[]) => {
        this.messages = data;
        this.scrollToBottom();
      },
      error: (error: any) => {
        console.error('Erreur lors de la récupération des messages:', error);
      },
      complete: () => {
        this.isLoadingMessage = false;
      }
    });
  }

  sendMessage(channelId: string) {
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

    // Envoi du message via WebSocket
    this.socketService.sendMessage(newMessage);

    // Sauvegarde du message dans le serveur
    this.saveMessage(channelId, newMessage);

    // Réinitialisation du champ de texte
    this.newMessageContent = '';
  }

  saveMessage(channelId: string, newMessage: MessageI) {
    this.messageService.store(channelId, newMessage).subscribe({
      next: (savedMessage: MessageI) => {
        console.log('Message saved:', savedMessage.content);
      },
      error: (error) => {
        console.error('Error saving message:', error);
      }
    });
  }

  scrollToBottom(): void {
    this.changeDetectorRef.detectChanges();
    setTimeout(() => {
      if (this.messageContainer) {
        this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
      }
    }, 100);
  }

  goToHome() {
    this.router.navigate([APP_ROUTES.HOME]);
  }

  goToSetting(channelId: string) {
    this.router.navigate([APP_ROUTES.CHANNEL.SETTING.replace(':id', String(channelId))]);
  }
}

