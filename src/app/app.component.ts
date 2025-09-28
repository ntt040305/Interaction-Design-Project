import { Component } from '@angular/core';
import {HeaderComponent} from './components/header/header.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {RouterOutlet} from '@angular/router';
import {FooterComponent} from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    HeaderComponent,
    SidebarComponent,
    RouterOutlet,
    FooterComponent
  ],
  styleUrls: ['./app.component.css']
})
export class AppComponent { }
