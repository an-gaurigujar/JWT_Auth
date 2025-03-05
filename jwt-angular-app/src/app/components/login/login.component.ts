import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    console.log(this.username);
    console.log(this.password);
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        console.log('Token:', response.token);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/protected']); 
      },
      error: (error) => {
        console.error('Login failed:', error);
      },
    });
  }
}