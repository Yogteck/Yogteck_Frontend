import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AdminAuthService } from '../../services/admin-auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent implements OnInit {
  username = '';
  password = '';
  showPassword = false;

  isLoading = false;
  errorMessage = '';

  constructor(
    private authService: AdminAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // If already logged in, redirect directly to dashboard
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/admin/dashboard']);
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  async onLogin(form: NgForm): Promise<void> {
    this.errorMessage = '';

    if (!this.username.trim() || !this.password) {
      this.errorMessage = 'Please enter both username and password.';
      return;
    }

    this.isLoading = true;

    try {
      const result = await this.authService.login(this.username.trim(), this.password);

      if (result.success) {
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.errorMessage = result.message || 'Invalid username or password.';
      }
    } catch (err) {
      this.errorMessage = 'An unexpected error occurred. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }
}
