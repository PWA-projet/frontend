import { Component, OnInit } from '@angular/core';
import { InputText } from 'primeng/inputtext';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from 'primeng/button';
import { Location } from '@angular/common';
import { ChannelService } from '../../../../shared/services/channel.service';

@Component({
  selector: 'app-join-channel',
    imports: [
        InputText,
        FormsModule,
        Button,
        ReactiveFormsModule
    ],
  templateUrl: './join-channel.component.html',
  styleUrl: './join-channel.component.css'
})
export class JoinChannelComponent implements OnInit {
  joinChannelForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private channelService: ChannelService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.joinChannelForm = this.fb.group({
      key: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
    });

    // Écoute les changements et met la valeur en uppercase
    this.joinChannelForm.get('key')?.valueChanges.subscribe(value => {
      if (value) {
        this.joinChannelForm.patchValue({ key: value.toUpperCase() }, { emitEvent: false });
      }
    });
  }

  joinChannel() {
    if (this.joinChannelForm.valid) {
      const key: string = this.joinChannelForm.value;

      this.channelService.join(key).subscribe({
        next: (response) => {
          console.log(response.success);
        },
        error: (error) => console.error('Channel join failed:', error)
      });
    } else {
      console.error('Form is invalid');
    }
  }

  goToBack(): void {
    this.location.back();
  }
}
