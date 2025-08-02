
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- Add this import
import { FormsModule } from '@angular/forms'; // Required for NgModel (two-way data binding)
import { HttpClientModule } from '@angular/common/http'; // Required for HTTP requests

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Import all components as standalone
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';
import { BoardModeratorComponent } from './components/board-moderator/board-moderator.component';
import { BoardUserComponent } from './components/board-user/board-user.component';

// Import the interceptor providers
import { authInterceptorProviders } from './_helpers/auth.interceptor';

@NgModule({
  // No components declared here for standalone components
  declarations: [
    // Keep this empty or include only non-standalone components if any
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    // Import all standalone components here
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent
  ],
  // Register the authInterceptorProviders here
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }