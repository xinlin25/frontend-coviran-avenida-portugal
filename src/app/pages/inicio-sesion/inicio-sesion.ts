import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Auth } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-inicio-sesion',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './inicio-sesion.html',
  styleUrl: './inicio-sesion.css',
})
export class InicioSesion {
  loginForm: FormGroup;
  mensaje: string = '';
  esError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private router: Router,
    private toast: ToastService,
  ) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.toast.success('Se ha iniciado sesión correctamente');
        this.authService.guardarToken(response.token);
        this.esError = false;
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.toast.error('Error al iniciar sesión');
        if (err.status === 401) {
          this.mensaje = 'Correo o contraseña incorrectos';
        } else {
          this.mensaje = 'Error en el servidor';
        }

        this.esError = true;
      },
    });
  }
}
