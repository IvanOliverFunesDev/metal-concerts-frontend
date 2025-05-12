import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  myForm: FormGroup;
  login() {
    if (this.myForm.valid) {
      this.authService.login(this.myForm.controls['email'].value, this.myForm.controls['password'].value).subscribe({
        next: (res) => {
          const role = res.role;
          Swal.fire({
            title: "Iniciar Sesion",
            icon: "success",
            text: "Has iniciado sesión correctamente"
          }).then(() => {
            const roleRoutes: { [key: string]: string } = {
              user: '/home',
              //band: '/home', crear ruta corresta
              //admin: '/home' crear ruta corresta
            };

            const route = roleRoutes[role];

            if (route) {
              this.router.navigateByUrl(route);
            }
          });
        },
        error: (err) => {
          Swal.fire({
            title: "ups",
            icon: "error",
            text: err.error.message
          })
        }
      })
    } else {
      this.myForm.markAllAsTouched();
    }
  }
  isNotValidField(field: string) { //funcion que comprueba si un campo es valido
    return !this.myForm.controls[field].valid && this.myForm.controls[field].touched // si el formulario no es valido y el usuario lo ha tocado
  }

}
