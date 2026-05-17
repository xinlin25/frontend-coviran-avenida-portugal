import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Auth } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar',
  imports: [RouterLink, ReactiveFormsModule],
  standalone: true,
  templateUrl: './recuperar.html',
  styleUrl: './recuperar.css',
})
export class Recuperar {
  recuperarForm: FormGroup;
  mensaje = '';
  esError = false;

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private router: Router,
  ) {
    this.recuperarForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
    });
  }

  get f() {
    return this.recuperarForm.controls;
  }

  onSubmit() {
    if (this.recuperarForm.invalid) return;

    this.auth.recuperarPassword(this.recuperarForm.value.correo).subscribe({
      next: () => {
        this.mensaje = 'Si el correo existe, se enviará un enlace de recuperación';
        this.esError = false;
        this.recuperarForm.reset();
      },

      error: () => {
        this.mensaje = 'Error al enviar el correo de recuperación';
        this.esError = true;
      },
    });
  }
}
