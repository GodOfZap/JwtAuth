// frontend/src/app/app.component.ts

import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { CommonModule } from '@angular/common'; // Required for *ngIf, *ngFor, etc.
import { RouterOutlet, RouterLink } from '@angular/router'; // Required for <router-outlet> and [routerLink]

@Component({
  selector: 'app-root',
  // Reference to the component's HTML template
  templateUrl: './app.component.html',
  // Reference to the component's CSS styles
  styleUrls: ['./app.component.css'],
  // Declare this component as standalone, meaning it manages its own dependencies
  standalone: true,
  // Array of NgModules or standalone directives/pipes that this component's template depends on
  imports: [
    CommonModule,   // Provides directives like *ngIf, *ngFor
    RouterOutlet,   // Provides the <router-outlet> element for displaying routed components
    RouterLink      // Provides the [routerLink] directive for navigation links (if used in HTML)
  ]
})
export class AppComponent implements OnInit {
  private roles: string[] = []; // User's roles
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string; // Current user's username

  // Inject the TokenStorageService to manage user authentication tokens
  constructor(private tokenStorageService: TokenStorageService) { }

  // Lifecycle hook: called after Angular has initialized all data-bound properties
  ngOnInit(): void {
    // Check if a token exists to determine login status
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      // Get user details from token storage
      const user = this.tokenStorageService.getUser();
      // Assign user's roles
      this.roles = user.roles;

      // Determine board visibility based on roles
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      // Set username for display
      this.username = user.username;
    }
  }

  // Handles user logout
  logout(): void {
    // Clear token and user info from storage
    this.tokenStorageService.signOut();
    // Reload the page to reset application state (e.g., clear UI elements, re-evaluate guards)
    window.location.reload();
  }
}