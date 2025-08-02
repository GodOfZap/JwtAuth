// frontend/src/app/app-routing.module.ts

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import all components
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BoardUserComponent } from './components/board-user/board-user.component';
import { BoardModeratorComponent } from './components/board-moderator/board-moderator.component';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';

// Import the AuthGuard
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // Protected routes using AuthGuard
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  // User board: accessible to any logged-in user (user, moderator, admin)
  {
    path: 'user',
    component: BoardUserComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_USER', 'ROLE_MODERATOR', 'ROLE_ADMIN'] }
  },
  // Moderator board: accessible to moderators and admins
  {
    path: 'mod',
    component: BoardModeratorComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_MODERATOR', 'ROLE_ADMIN'] }
  },
  // Admin board: accessible only to admins
  {
    path: 'admin',
    component: BoardAdminComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] }
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' } // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }