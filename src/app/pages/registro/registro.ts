import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth } from '../../services/auth/auth.service';

@Component({
  selector: 'app-registro',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {
  registerForm: FormGroup;
  mensaje: string = '';
  esError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private router: Router,
  ) {
    this.registerForm = this.fb.group({
      nombreCompleto: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
      ],
      tlf: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(15)]],
      correo: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(100)],
      ],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(60)]],
      direccion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    if (this.registerForm.invalid) return;

    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.mensaje = 'Usuario registrado correctamente';
        this.esError = false;

        setTimeout(() => {
          this.router.navigate(['/inicio-sesion']);
        }, 2000);
      },
      error: (err) => {
        if (err.status === 409) {
          // Añadimos error manual al control correo
          this.registerForm.get('correo')?.setErrors({ correoDuplicado: true });
          this.registerForm.get('correo')?.markAsTouched();
        } else {
          this.mensaje = 'Error al registrar usuario';
        }

        this.esError = true;
      },
    });
  }
}
