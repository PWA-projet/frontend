import { Component, Input } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { EmojiPickerComponent, EmojiSelectedEvent } from '@chit-chat/ngx-emoji-picker/lib/components/emoji-picker';
import { ConnectedPosition } from '@angular/cdk/overlay';
import { DialogComponent } from '@chit-chat/ngx-emoji-picker/lib/components/dialog';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-emoji-dialog',
  standalone: true,
  imports: [DialogModule, EmojiPickerComponent, DialogComponent, Button],
  templateUrl: './emoji-dialog.component.html',
  styleUrls: ['./emoji-dialog.component.css'],
})
export class EmojiDialogComponent {
  @Input() onEmojiSelect!: (emoji: string) => void;
  @Input() visible: boolean = false;

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

  toggleEmojiDialog() {
    this.visible = !this.visible;
  }
}
