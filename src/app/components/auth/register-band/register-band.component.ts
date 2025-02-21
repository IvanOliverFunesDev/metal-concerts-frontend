import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-band',
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register-band.component.html',
  styleUrl: './register-band.component.css'
})
export class RegisterBandComponent {

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      bandName: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      genre: ['', [Validators.required]]
    })
  }
  myForm: FormGroup;
  registerBand() {
    if (this.myForm.valid) {
      this.authService.registerBand(this.myForm.controls['email'].value, this.myForm.controls['password'].value, this.myForm.controls['bandName'].value, this.myForm.controls['description'].value, this.myForm.controls['genre'].value,).subscribe({
        next: (res) => {
          Swal.fire({
            title: "Registro Completado",
            icon: "success",
            text: `Recibirás un mensaje en ${this.myForm.controls['email'].value} cuando el administrador haya validado tus datos.`
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
