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

    this.usuarioService.actualizarUsuario(this.usuarioEditando.id, this.usuarioEditando).subscribe({
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
        console.error(err);

        if (err.status === 403 || err.status === 401) {
          alert('No tienes permisos o sesión expirada');
        } else {
          alert('Error al guardar usuario');
        }
      },
    });
  }
}
