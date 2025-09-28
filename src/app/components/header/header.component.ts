import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  currentTime: Date = new Date();

  ngOnInit() {
    // Update time every second
    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }
}
