import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-formulario-perfil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario-perfil.html',
  styleUrl: './formulario-perfil.css',
})
export class FormularioPerfil {
  @Input() usuario: any;

  @Output() cancelar = new EventEmitter<void>();
  @Output() guardado = new EventEmitter<void>();

  perfilForm: FormGroup;

  mensaje: string = '';
  esError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
  ) {
    this.perfilForm = this.fb.group({
      nombreCompleto: ['', [Validators.required, Validators.minLength(3)]],
      tlf: ['', [Validators.required, Validators.minLength(9)]],
      direccion: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  ngOnInit() {
    if (this.usuario) {
      this.perfilForm.patchValue({
        nombreCompleto: this.usuario.nombreCompleto,
        tlf: this.usuario.tlf,
        direccion: this.usuario.direccion,
      });
    }
  }

  onSubmit() {
    if (this.perfilForm.invalid) return;

    this.authService.actualizarPerfil(this.perfilForm.value).subscribe({
      next: () => {
        this.mensaje = 'Perfil actualizado correctamente';
        this.esError = false;

        this.guardado.emit(this.perfilForm.value);
      },
      error: () => {
        this.mensaje = 'Error al actualizar perfil';
        this.esError = true;
      },
    });
  }
}
