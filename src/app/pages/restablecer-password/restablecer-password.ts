import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth/auth.service';

@Component({
  selector: 'app-restablecer-password',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './restablecer-password.html',
  styleUrl: './restablecer-password.css',
})
export class RestablecerPassword {
  resetForm: FormGroup;
  token = '';
  mostrarPassword = false;
  mostrarConfirmPassword = false;
  mensaje = '';
  esError = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private auth: Auth,
    private router: Router,
  ) {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';

    this.resetForm = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(60)]],

        confirmPassword: ['', Validators.required],
      },
      {
        validators: this.passwordsIguales,
      },
    );
  }

  get f() {
    return this.resetForm.controls;
  }

  passwordsIguales(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ noCoinciden: true });
    } else {
      const errors = form.get('confirmPassword')?.errors;

      if (errors) {
        delete errors['noCoinciden'];

        if (Object.keys(errors).length === 0) {
          form.get('confirmPassword')?.setErrors(null);
        } else {
          form.get('confirmPassword')?.setErrors(errors);
        }
      }
    }

    return null;
  }

  onSubmit() {
    if (this.resetForm.invalid) return;

    this.auth
      .restablecerPassword({
        token: this.token,
        password: this.resetForm.value.password,
      })
      .subscribe({
        next: () => {
          this.mensaje = 'Contraseña actualizada correctamente';

          this.esError = false;

          setTimeout(() => {
            this.router.navigate(['/inicio-sesion']);
          }, 2000);
        },

        error: (err) => {
          if (err.status === 400) {
            this.mensaje = 'El enlace es inválido o ha expirado';
          } else {
            this.mensaje = 'Error al restablecer contraseña';
          }

          this.esError = true;
        },
      });
  }
}
