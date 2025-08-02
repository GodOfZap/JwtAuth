import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { Routes } from '@angular/router';
import { RegisterComponent } from '../register/register.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
    standalone: true,
     imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  content?: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getPublicContent().subscribe({
      next: data => {
        this.content = data;
      },
    error: err => {
  try {
    this.content = JSON.parse(err.error)?.message || 'Unknown error';
    console.error('API Error:', err);
  } catch (e) {
    console.error('Error parsing API response:', e);
    this.content = 'Server unreachable or malformed response.';
  }
}
    });
  }
}