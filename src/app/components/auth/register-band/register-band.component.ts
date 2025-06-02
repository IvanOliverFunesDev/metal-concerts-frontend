import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { ConcertsService } from '../../../services/concerts.service';
import { NgForOf } from '@angular/common'; // 👈 IMPORTAR ESTO

@Component({
  selector: 'app-register-band',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink, NgForOf],
  templateUrl: './register-band.component.html',
  styleUrl: './register-band.component.css'
})
export class RegisterBandComponent implements OnInit {
  myForm: FormGroup;
  genres: string[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    public concertsService: ConcertsService
  ) {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      bandName: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      genre: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.concertsService.getGenresConcerts().subscribe({
      next: (data) => {
        this.genres = data;
      },
      error: (err) => console.error('Error cargando generos', err.message)
    });
  }

  registerBand() {
    if (this.myForm.valid) {
      this.authService.registerBand(
        this.myForm.value.email,
        this.myForm.value.password,
        this.myForm.value.bandName,
        this.myForm.value.description,
        this.myForm.value.genre
      ).subscribe({
        next: () => {
          Swal.fire({
            title: "Registro Completado",
            icon: "success",
            text: `Recibirás un mensaje en ${this.myForm.value.email} cuando el administrador haya validado tus datos.`
          });
        },
        error: (err) => {
          Swal.fire({
            title: "Ups",
            icon: "error",
            text: err.error.message
          });
        }
      });
    } else {
      this.myForm.markAllAsTouched();
    }
  }

  isNotValidField(field: string): boolean {
    return !this.myForm.controls[field].valid && this.myForm.controls[field].touched;
  }
}
