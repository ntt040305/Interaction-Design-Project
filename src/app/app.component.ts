import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService, AppUser } from './services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    CommonModule,
    HeaderComponent,
    SidebarComponent,
    RouterOutlet,
    FooterComponent,
    LoginComponent
  ],
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  user: AppUser | null = null;
  private sub?: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    console.log('AppComponent initialized');
    this.sub = this.authService.user$.subscribe(u => {
      console.log('User state changed:', u);
      this.user = u;
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  isLoggedIn(): boolean {
    return !!this.user;
  }
}
