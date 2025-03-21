import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { InputText } from "primeng/inputtext";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ChannelService } from '../../../../shared/services/channel.service';
import { ChannelI } from '../../../../shared/models/channel.model';
import { Button } from 'primeng/button';
import { APP_ROUTES } from '../../../../shared/constants/routes';
import { Router } from '@angular/router';
import { Message } from 'primeng/message';

@Component({
  selector: 'app-create-channel',
  imports: [
    InputText,
    ReactiveFormsModule,
    Button,
    Message,
    NgIf
  ],
  templateUrl: './create-channel.component.html',
  standalone: true,
  styleUrl: './create-channel.component.css'
})
export class CreateChannelComponent implements OnInit {
  createChannelForm!: FormGroup;
  isLoading: boolean = false;  // Ajout de l'état de chargement

  constructor(
    private fb: FormBuilder,
    private channelService: ChannelService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createChannelForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
    });
  }

  createChannel() {
    if (this.createChannelForm.valid) {
      const newChannel: ChannelI = this.createChannelForm.value;
      this.isLoading = true;

      this.channelService.create(newChannel).subscribe({
        next: (response) => {
          console.log("Channel successfully created : ", response.name);
          this.goToHome();
        },
        error: (error) => {
          console.error('Channel create failed:', error);
        },
        complete: () => {
          this.isLoading = false;  // Arrête le chargement à la fin
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
