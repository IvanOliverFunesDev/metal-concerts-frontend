import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Observable, pipe } from 'rxjs';
import { User } from '../../../interfaces/user';
import { AsyncPipe, NgIf } from '@angular/common';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, NgIf, AsyncPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  menuActive: boolean = false;
  user$: Observable<User | null>
  constructor(private authService: AuthService, private router: Router) {
    this.user$ = this.authService.user$;
  }
  toggleMenu(): void {
    this.menuActive = !this.menuActive;
  }

  closeMenu(): void {
    this.menuActive = false;
  }
  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigateByUrl('/home'); // 🔥 Redirigir a Home tras cerrar sesión
      },
      error: (err) => console.error('Error al cerrar sesión:', err)
    });
  }
}
