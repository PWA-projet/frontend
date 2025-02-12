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
import { APP_ROUTES } from '../shared/constants/routes';

export const routes: Routes = [
  { path: APP_ROUTES.AUTH.REGISTER, component: RegisterComponent, canActivate: [NoAuthGuard] },
  { path: APP_ROUTES.AUTH.LOGIN, component: LoginComponent, canActivate: [NoAuthGuard] },

  { path: APP_ROUTES.HOME, component: HomeComponent, canActivate: [AuthGuard] },
  { path: APP_ROUTES.PROFILE, component: ProfileComponent, canActivate: [AuthGuard] },
  { path: APP_ROUTES.CHANNEL.CREATE, component: CreateChannelComponent, canActivate: [AuthGuard] },
  { path: APP_ROUTES.CHANNEL.JOIN, component: JoinChannelComponent, canActivate: [AuthGuard] },
  { path: APP_ROUTES.CHANNEL.ID, component: ChannelComponent, canActivate: [AuthGuard] },

  { path: APP_ROUTES.NOT_FOUND, component: NotFoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
