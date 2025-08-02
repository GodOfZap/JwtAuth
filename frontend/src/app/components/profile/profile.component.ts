import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../_services/token-storage.service';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
    standalone: true, // <--- MAKE SURE THIS IS SET TO TRUE
  imports: [
    CommonModule, // For *ngIf, *ngFor
  ]
})
export class ProfileComponent implements OnInit {
  currentUser: any;

  constructor(private token: TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
  }
}