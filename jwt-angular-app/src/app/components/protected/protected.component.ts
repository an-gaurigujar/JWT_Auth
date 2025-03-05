import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-protected',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.css'],
})
export class ProtectedComponent implements OnInit {
  data: any;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getProtectedData().subscribe({
      next: (response) => {
        this.data = response;
      },
      error: (error) => {
        console.error('Failed to fetch protected data:', error);
      },
    });
  }
}
