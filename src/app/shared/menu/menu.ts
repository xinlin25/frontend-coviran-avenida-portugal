import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { CategoriasService } from '../../services/categorias/categorias.service';

import { Categoria } from '../../models/categoria';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './menu.html',
  styleUrls: ['./menu.css'],
})
export class Menu implements OnInit {
  categorias: Categoria[] = [];
  categoriasExpandidas: number[] = [];

  constructor(private categoriasService: CategoriasService) {}

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.categoriasService.getCategorias().subscribe({
      next: (data) => {
        this.categorias = data.filter((categoria) => categoria.parent == null && categoria.activo);
      },
      error: (err) => console.error(err),
    });
  }

  toggleCategoria(id: number) {
    if (this.categoriasExpandidas.includes(id)) {
      this.categoriasExpandidas = this.categoriasExpandidas.filter(
        (categoriaId) => categoriaId !== id,
      );
    } else this.categoriasExpandidas.push(id);
  }
}
