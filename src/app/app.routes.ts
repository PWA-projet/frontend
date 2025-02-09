import { RouterModule, Routes } from '@angular/router';
import { NgModule } from "@angular/core";
import { AuthGuard } from "../shared/guards/auth.guard";
import { NoAuthGuard } from "../shared/guards/no-auth.guard";
import { RegisterComponent } from "./pages/auth/register/register.component";
import { LoginComponent } from "./pages/auth/login/login.component";
import { HomeComponent } from "./pages/home/home.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { ChannelComponent } from './pages/channel/channel.component';
import { CreateChannelComponent } from './pages/channel/create-channel/create-channel.component';
import { JoinChannelComponent } from './pages/channel/join-channel/join-channel.component';

export const routes: Routes = [
  {
    path: 'auth',
    canActivate : [NoAuthGuard],
    children: [
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
    ],
  },
  {
    path: '',
    canActivate : [AuthGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'profile', component: ProfileComponent },
    ],
  },
  {
    path: 'channel',
    canActivate : [AuthGuard],
    children: [
      { path: '', component: ChannelComponent },
      { path: 'create', component: CreateChannelComponent },
      { path: 'join', component: JoinChannelComponent },
    ],
  },
  // public routes
  { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
