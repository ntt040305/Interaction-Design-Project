import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService, AppUser } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit, OnDestroy {
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

  getUserInitials(): string {
    if (!this.user?.displayName) return 'U';
    const parts = this.user.displayName.trim().split(/\s+/).filter(p => p.length > 0);
    if (parts.length === 0) return 'U';
    return parts.slice(0,2).map(p => p[0].toUpperCase()).join('');
  }

  getUserRoleText(): string {
    if (!this.user) return 'Guest';
    return this.user.role === 'teacher' ? 'Teacher' : 'Student';
  }
}
