import { Routes } from '@angular/router';
import { HomeComponent } from './app/components/home/home.component';
import { ProfileComponent } from './app/components/profile/profile.component';
import { RegisterComponent } from './app/components/register/register.component';
import { LoginComponent } from './app/components/login/login.component';
import { BoardAdminComponent } from './app/components/board-admin/board-admin.component';
import { BoardUserComponent } from './app/components/board-user/board-user.component';
import { BoardModeratorComponent } from './app/components/board-moderator/board-moderator.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {path: 'admin', component: BoardAdminComponent },
{path: 'user', component: BoardUserComponent },
{path: 'mod', component: BoardModeratorComponent },
];

