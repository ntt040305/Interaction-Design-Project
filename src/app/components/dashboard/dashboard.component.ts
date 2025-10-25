import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, AppUser } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {
  today = new Date();
  user: AppUser | null = null;
  private sub?: Subscription;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.sub = this.auth.user$.subscribe(u => this.user = u);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  isStudent(): boolean {
    return !!this.user && this.user.role === 'student';
  }

  isTeacher(): boolean {
    return !!this.user && this.user.role === 'teacher';
  }

  getUserName(): string {
    return this.user?.displayName || 'Guest';
  }
}
