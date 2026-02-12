import { Component } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-registro',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      nombreCompleto: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      tlf: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(15)]],
      correo: ['', [Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(100)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(60)]],
      direccion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]]
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) return;

    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        alert("Usuario registrado correctamente");
        this.router.navigate(['/inicio-sesion']);
      },
      error: () => {
        alert("Error al regitrar usuario");
      } 
    })
  }
}
