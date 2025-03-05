import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, MatCardModule, MatInputModule, MatButtonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  username = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onRegister() {
    this.authService.register(this.username, this.password).subscribe({
      next: (response) => {
        this.snackBar.open('Registration successful! Please login.', 'Close', {
          duration: 3000,
        });
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.snackBar.open('Registration failed. Please try again.', 'Close', {
          duration: 3000,
        });
      },
    });
  }
}
