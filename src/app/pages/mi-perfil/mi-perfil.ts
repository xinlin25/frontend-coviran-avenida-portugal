import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Auth } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormularioPerfil } from './formulario-perfil/formulario-perfil';

@Component({
  selector: 'app-mi-perfil',
  standalone: true,
  imports: [CommonModule, FormularioPerfil],
  templateUrl: './mi-perfil.html',
  styleUrl: './mi-perfil.css',
})
export class MiPerfil implements OnInit {
  usuario: any;
  modoEdicion: boolean = false;

  constructor(
    private authService: Auth,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.cargarPerfil();
  }

  cargarPerfil() {
    this.authService.getMiPerfil().subscribe({
      next: (data) => {
        this.usuario = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  activarEdicion() {
    this.modoEdicion = true;
  }

  cancelarEdicion() {
    this.modoEdicion = false;
  }

  perfilActualizado(datos: any) {
    this.modoEdicion = false;
    this.usuario = {
      ...this.usuario,
      ...datos,
    };
    this.cargarPerfil();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
