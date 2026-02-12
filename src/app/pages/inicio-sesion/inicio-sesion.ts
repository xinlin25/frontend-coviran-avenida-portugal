import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-inicio-sesion',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './inicio-sesion.html',
  styleUrl: './inicio-sesion.css',
})

export class InicioSesion {
  loginForm: FormGroup;

  constructor(
    private fb:FormBuilder,
    private authService: Auth,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        console.log('Token recibido:', response.token);
      },
      error: () => {
        alert("Credenciales incorrectaas");
      }
    });
  }
}
