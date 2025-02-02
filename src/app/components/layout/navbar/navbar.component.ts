import { Component } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { gsap } from 'gsap';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule, NgIf, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isMobile: boolean = false;
  menuOpen: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe(['(max-width: 768px)']).subscribe(result => {
      this.isMobile = result.matches;
    });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;

    if (this.menuOpen) {
      gsap.to('.side-menu', { right: 0, duration: 0.3, ease: 'power2.out' });
      gsap.to('.menu-overlay', { opacity: 1, display: 'block', duration: 0.3 });
    } else {
      gsap.to('.side-menu', { right: '-300px', duration: 0.3, ease: 'power2.in' });
      gsap.to('.menu-overlay', { opacity: 0, display: 'none', duration: 0.3 });
    }
  }
}
