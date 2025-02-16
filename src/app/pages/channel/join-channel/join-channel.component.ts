import { Component, OnInit } from '@angular/core';
import { InputText } from 'primeng/inputtext';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from 'primeng/button';
import { Location, NgIf } from '@angular/common';
import { ChannelService } from '../../../../shared/services/channel.service';
import { APP_ROUTES } from '../../../../shared/constants/routes';
import { Router } from '@angular/router';
import { Message } from 'primeng/message';

@Component({
  selector: 'app-join-channel',
  imports: [
    InputText,
    FormsModule,
    Button,
    ReactiveFormsModule,
    Message,
    NgIf
  ],
  templateUrl: './join-channel.component.html',
  standalone: true,
  styleUrl: './join-channel.component.css'
})
export class JoinChannelComponent implements OnInit {
  joinChannelForm!: FormGroup;
  channelNotFound: boolean = false;

  constructor(
    private fb: FormBuilder,
    private channelService: ChannelService,
    private location: Location,
    private router: Router
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
      this.channelNotFound = false; // Réinitialise l'erreur lors de la saisie
    });
  }

  joinChannel() {
    if (this.joinChannelForm.valid) {
      const key: string = this.joinChannelForm.value;

      this.channelService.join(key).subscribe({
        next: (response) => {
          console.log(response.success);
          this.goToHome();
        },
        error: (error) => {
          console.error('Channel join failed:', error);
          this.channelNotFound = true; // Active le message d'erreur si la clé est incorrecte
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }

  goToHome() {
    this.router.navigate([APP_ROUTES.HOME]);
  }
}
