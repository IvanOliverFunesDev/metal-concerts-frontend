import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  currentStep: number = 1;

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  myForm: FormGroup

  sendEmail() {
    if (this.myForm.valid) {
      this.authService.forgotPassword(this.myForm.controls['email'].value).subscribe({
        next: (response) => {
          Swal.fire({
            icon: "success",
            title: "Codigo enviado al email",
            text: response.message,
          });
          this.myForm = this.fb.group({
            code: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]]
          });
          this.currentStep++
        },
        error: (err) => {
          Swal.fire({
            icon: "error",
            title: "Email no encontrado",
            text: err.error?.message || "problema.",
          })
        }
      })
    }
  }

  isNotValidField(field: string) {
    return !this.myForm.controls[field].valid && this.myForm.controls[field].touched
  }
}
