import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../../services/usuarios/usuario.service';
import { Usuario } from '../../../models/usuario';
import { ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuarios-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios-admin.html',
  styleUrl: './usuarios-admin.css',
})
export class UsuariosAdmin implements OnInit {
  usuarios: Usuario[] = [];
  usuarioSeleccionado: Usuario | null = null;
  modoEdicion: boolean = false;
  usuarioEditando: Usuario | null = null;

  constructor(
    private usuarioService: UsuarioService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuarioService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar usuarios:', err);
      },
    });
  }

  seleccionarUsuario(u: Usuario) {
    this.usuarioSeleccionado = u;
  }

  abrirModal(usuario: Usuario) {
    this.usuarioSeleccionado = usuario;
    this.modoEdicion = false;

    this.usuarioEditando = { ...usuario };
  }

  cambiarRol() {
    if (!this.usuarioSeleccionado) return;

    const nuevoRol = this.usuarioSeleccionado.rol === 'CLIENTE' ? 'EMPLEADO' : 'CLIENTE';

    this.usuarioService.cambiarRol(this.usuarioSeleccionado.id, nuevoRol).subscribe({
      next: () => {
        this.usuarioSeleccionado!.rol = nuevoRol;
      },
      error: (err) => console.error(err),
    });
  }

  toggleActivo() {
    if (!this.usuarioSeleccionado) return;

    this.usuarioService.toggleActivo(this.usuarioSeleccionado.id).subscribe({
      next: () => {
        this.usuarioSeleccionado!.enabled = !this.usuarioSeleccionado!.enabled;
      },
      error: (err) => console.error(err),
    });
  }

  guardarCambios() {
    if (!this.usuarioEditando) return;

    if (this.usuarioEditando.id === 0) {
      if (!this.usuarioEditando.password || this.usuarioEditando.password.trim() === '') {
        alert('La contraseña es obligatoria');
        return;
      }

      const usuarioCrear = {
        nombreCompleto: this.usuarioEditando.nombreCompleto,
        correo: this.usuarioEditando.correo,
        password: this.usuarioEditando.password,
        tlf: this.usuarioEditando.tlf,
        direccion: this.usuarioEditando.direccion,
        rol: this.usuarioEditando.rol,
        enabled: this.usuarioEditando.enabled,
      };

      this.usuarioService.crearUsuario(usuarioCrear).subscribe({
        next: () => {
          this.modoEdicion = false;
          this.cargarUsuarios();

          const modal = document.getElementById('usuarioModal');
          if (modal) (window as any).bootstrap.Modal.getInstance(modal)?.hide();
        },
        error: (err) => {
          console.error(err);
          alert('Error al crear usuario');
        },
      });
    } else {
      const usuarioActualizar = {
        nombreCompleto: this.usuarioEditando.nombreCompleto,
        correo: this.usuarioEditando.correo,
        tlf: this.usuarioEditando.tlf,
        direccion: this.usuarioEditando.direccion,
        rol: this.usuarioEditando.rol,
        enabled: this.usuarioEditando.enabled,
      };

      this.usuarioService.actualizarUsuario(this.usuarioEditando.id, usuarioActualizar).subscribe({
        next: () => {
          this.usuarioSeleccionado = { ...this.usuarioEditando } as Usuario;
          this.modoEdicion = false;

          this.cargarUsuarios();

          const modal = document.getElementById('usuarioModal');
          if (modal) {
            (window as any).bootstrap.Modal.getInstance(modal)?.hide();
          }
        },
        error: (err) => {
          console.error('ERROR COMPLETO:', err);
          console.error('STATUS:', err.status);
          console.error('BODY:', err.error);

          alert('Error al crear usuario');
        },
      });
    }
  }

  nuevoUsuario() {
    this.modoEdicion = true;

    this.usuarioEditando = {
      id: 0,
      nombreCompleto: '',
      correo: '',
      password: '',
      tlf: '',
      direccion: '',
      rol: 'CLIENTE',
      enabled: true,
    } as Usuario;
  }

  cerrarModal() {
    this.usuarioEditando = null;
    this.usuarioSeleccionado = null;
    this.modoEdicion = false;
  }
}
