import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, AppUser } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentTime: Date = new Date();
  user: AppUser | null = null;
  private sub?: Subscription;
  initials: string = '';

  constructor(private auth: AuthService) {}

  ngOnInit() {
    // Update time every second
    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);

    this.sub = this.auth.user$.subscribe(u => this.user = u);
    this.sub = this.auth.user$.subscribe(u => {
      this.user = u;
      this.initials = this.computeInitials(u?.displayName);
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  signIn() {
    this.auth.signInWithGoogle();
  }

  signOut() {
    this.auth.signOut();
  }

  isTeacher(): boolean {
    return !!this.user && this.user.role === 'teacher';
  }

  private computeInitials(name?: string | null): string {
    if (!name) return '';
    const parts = name.trim().split(/\s+/).filter(p => p.length > 0);
    if (parts.length === 0) return '';
    return parts.slice(0,2).map(p => p[0].toUpperCase()).join('');
  }
}
