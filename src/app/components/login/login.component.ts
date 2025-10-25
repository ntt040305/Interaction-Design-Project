import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isLoading = false;
  errorMessage = '';
  email = '';
  password = '';

  constructor(private authService: AuthService) {}

  async signInWithEmail() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter both email and password.';
      return;
    }

    try {
      this.isLoading = true;
      this.errorMessage = '';
      console.log('Attempting to sign in with email:', this.email);
      
      // Create mock user based on email
      const mockUser = {
        uid: 'mock-user-' + Date.now(),
        displayName: this.email.split('@')[0],
        email: this.email,
        photoURL: null,
        role: this.determineUserRole(this.email)
      };
      
      // Simulate login delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Set user in auth service
      this.authService.setMockUser(mockUser);
      console.log('Sign in successful');
    } catch (error) {
      console.error('Sign in failed:', error);
      this.errorMessage = 'Sign in failed. Please check your email and password.';
    } finally {
      this.isLoading = false;
    }
  }

  async signInWithGoogle() {
    try {
      this.isLoading = true;
      this.errorMessage = '';
      console.log('Attempting to sign in with Google...');
      
      await this.authService.signInWithGoogle();
      console.log('Sign in successful');
    } catch (error) {
      console.error('Sign in failed:', error);
      this.errorMessage = 'Sign in failed. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }

  private determineUserRole(email: string): 'student' | 'teacher' | 'unknown' {
    if (!email) return 'unknown';
    
    // Check if email ends with teacher domain
    if (email.endsWith('@teacher.hsu.edu.vn') || email.endsWith('@hsu.edu.vn')) {
      return 'teacher';
    }
    
    // Check if email ends with student domain
    if (email.endsWith('@student.hsu.edu.vn')) {
      return 'student';
    }
    
    // Default to student for other domains
    return 'student';
  }
}
