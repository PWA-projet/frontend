import { RouterModule, Routes } from '@angular/router';
import { NgModule } from "@angular/core";
import { AuthGuard } from "../shared/guards/auth.guard";
import { NoAuthGuard } from "../shared/guards/no-auth.guard";
import { RegisterComponent } from "./pages/auth/register/register.component";
import { LoginComponent } from "./pages/auth/login/login.component";
import { HomeComponent } from "./pages/home/home.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";

export const routes: Routes = [
  {
    path: 'auth',
    // NoAuthGuard routes
    canActivate : [NoAuthGuard],
    children: [
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
    ],
  },
  {
    path: '',
    // AuthGuard routes
    canActivate : [AuthGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'profile', component: ProfileComponent },
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
