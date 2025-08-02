import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormsModule } from '@angular/forms';   // For ngForm and ngModel

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
    standalone: true, // <--- MAKE SURE THIS IS SET TO TRUE
  imports: [
    CommonModule, // For *ngIf, *ngFor
        FormsModule   // Add FormsModule for ngForm and ngModel
  ]
})
export class RegisterComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null,
    roles: ['user'] // Default role
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void { }

  onSubmit(): void {
    const { username, email, password, roles } = this.form;

    this.authService.register({ username, email, password, roles }).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }
}