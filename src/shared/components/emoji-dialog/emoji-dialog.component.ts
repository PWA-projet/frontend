import { Component, ElementRef, Input, ViewChild, signal } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { EmojiPickerComponent, EmojiSelectedEvent } from '@chit-chat/ngx-emoji-picker/lib/components/emoji-picker';
import { DialogComponent } from '@chit-chat/ngx-emoji-picker/lib/components/dialog';
import { ConnectedPosition } from '@angular/cdk/overlay';

@Component({
  selector: 'app-emoji-dialog',
  standalone: true,
  imports: [DialogModule, EmojiPickerComponent, DialogComponent],
  templateUrl: './emoji-dialog.component.html',
  styleUrls: ['./emoji-dialog.component.css'],
})
export class EmojiDialogComponent {
  @Input() targetButton!: ElementRef;
  @Input() onEmojiSelect!: (emoji: string) => void;

  visible = signal<boolean>(false);
  dialogPositions: ConnectedPosition[] = [
    {
      originX: 'end',
      originY: 'top',
      overlayX: 'end',
      overlayY: 'bottom',
      offsetY: -10,
    },
  ];

  handleEmojiSelected(evt: EmojiSelectedEvent) {
    if (evt?.emoji?.value) {
      this.onEmojiSelect(evt.emoji.value);
    }
  }
}
