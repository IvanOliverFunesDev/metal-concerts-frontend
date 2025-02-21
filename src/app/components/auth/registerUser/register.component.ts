import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      username: ['', [Validators.required]]
    })
  }
  myForm: FormGroup;
  registerUser() {
    if (this.myForm.valid) {
      this.authService.registerUSer(this.myForm.controls['email'].value, this.myForm.controls['password'].value, this.myForm.controls['username'].value).subscribe({
        next: (res) => {
          Swal.fire({
            title: "Registrar Nuevo Usuario",
            icon: "success",
            text: "Te has registrado correctamente"
          }).then(() => {
            this.router.navigateByUrl("/login");
          });
        },
        error: (err) => {
          Swal.fire({
            title: "Ups",
            icon: "error",
            text: err.error.message
          })
        }
      })
    }
    else {
      this.myForm.markAllAsTouched()
    }
  }
  isNotValidField(field: string) { //funcion que comprueba si un campo es valido
    return !this.myForm.controls[field].valid && this.myForm.controls[field].touched // si el formulario no es valido y el usuario lo ha tocado
  }

}
