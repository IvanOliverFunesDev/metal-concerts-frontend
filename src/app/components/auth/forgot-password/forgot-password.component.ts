import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

export function passwordMatchValidator(): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordsNotMatching: true };
  };
}
@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  currentStep: number = 1;
  emailStored = '';
  codeStored = '';

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  myForm: FormGroup

  sendEmail() {
    if (this.myForm.valid) {
      this.emailStored = this.myForm.controls['email'].value
      this.authService.forgotPassword(this.myForm.controls['email'].value).subscribe({
        next: (res) => {
          Swal.fire({
            icon: "success",
            title: "Codigo enviado al email",
            text: res.message,
          });
          this.myForm = this.fb.group({
            code: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
          })
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

  sendVerifyCode() {
    if (this.myForm.valid) {
      this.codeStored = this.myForm.controls['code'].value
      this.authService.verifyResetCode(this.emailStored, this.codeStored).subscribe({
        next: (res) => {
          Swal.fire({
            icon: "success",
            title: "Codigo enviado al email",
            text: res.message,
          });
          this.myForm = this.fb.group({
            newPassword: ['', [Validators.required]],
            confirmPassword: ['', [Validators.required]],
          }, { validators: passwordMatchValidator() });
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

  resetPassword() {
    if (this.myForm.valid) {
      this.authService.resetPassword(this.emailStored, this.codeStored, this.myForm.controls['newPassword'].value, this.myForm.controls['confirmPassword'].value).subscribe({
        next: (res) => {
          Swal.fire({
            icon: "success",
            title: "Contraseña cambiada correctamente",
            text: res.message,
          }).then(() => {
            this.router.navigateByUrl("/home");
          });
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
