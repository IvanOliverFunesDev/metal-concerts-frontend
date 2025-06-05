import { Component, OnInit } from '@angular/core';
import { ProfileUser } from '../../../interfaces/user';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';
import { DatePipe, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { SliderComponent } from '../../layout/slider/slider.component';

@Component({
  selector: 'app-profile',
  imports: [DatePipe, NgIf, SliderComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user!: ProfileUser

  constructor(private authService: AuthService, private router: Router) { }
  ngOnInit(): void {
    this.authService.profileUser().subscribe({
      next: (data) => {
        this.user = data;
        console.log("usuario cargado:", this.user);
      },
      error: (err) => {
        Swal.fire({
          icon: "error",
          title: "Error al cargar el perfil",
          text: err.error.message
        }).then(() => {
          this.router.navigateByUrl('/home');
        })
      }
    })
  }



}
