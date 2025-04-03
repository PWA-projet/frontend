import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { EmojiPickerComponent, EmojiSelectedEvent } from '@chit-chat/ngx-emoji-picker/lib/components/emoji-picker';
import { ConnectedPosition } from '@angular/cdk/overlay';
import { DialogComponent } from '@chit-chat/ngx-emoji-picker/lib/components/dialog';
import { Button } from 'primeng/button';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-emoji-dialog',
  standalone: true,
  imports: [DialogModule, EmojiPickerComponent, DialogComponent, Button, NgIf],
  templateUrl: './emoji-dialog.component.html',
  styleUrls: ['./emoji-dialog.component.css'],
})
export class EmojiDialogComponent {
  @Input() onEmojiSelect!: (emoji: string) => void;
  @Input() visible: boolean = false;
  @ViewChild('emojiButton', { read: ElementRef }) emojiButton!: ElementRef;

  isSmallScreen: boolean = window.innerWidth <= 768;
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isSmallScreen = window.innerWidth <= 768;
  }

  dialogPositions: ConnectedPosition[] = [
    {
      originX: 'end',
      originY: 'top',
      overlayX: 'end',
      overlayY: 'bottom',
      offsetY: -30,
    },
  ];

  handleEmojiSelected(evt: EmojiSelectedEvent) {
    if (evt?.emoji?.value) {
      this.onEmojiSelect(evt.emoji.value);
    }
  }

  toggleEmojiDialog() {
    this.visible = !this.visible;
  }

  get emojiButtonElement() {
    return this.emojiButton ? this.emojiButton.nativeElement : null;
  }
}
