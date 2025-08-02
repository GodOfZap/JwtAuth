import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../_services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private tokenStorageService: TokenStorageService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const user = this.tokenStorageService.getUser();
    const isLoggedIn = !!user.accessToken; // Check if token exists

    if (isLoggedIn) {
      if (route.data['roles']) { // Check for required roles
        const userRoles = user.roles || []; // Ensure userRoles is an array
        const requiredRoles = route.data['roles'] as Array<string>;

        const hasRequiredRole = requiredRoles.some(role => userRoles.includes(role));

        if (hasRequiredRole) {
          return true;
        } else {
          // User is logged in but doesn't have the required role
          this.router.navigate(['/']); // Redirect to home or unauthorized page
          return false;
        }
      }
      return true; // No specific roles required, just logged in
    } else {
      // Not logged in, redirect to login page
      this.router.navigate(['/login']);
      return false;
    }
  }
}