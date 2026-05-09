import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ProductoService } from '../../services/productos/productos.service';
import { CategoriasService } from '../../services/categorias/categorias.service';

import { Producto } from '../../models/producto';
import { Categoria } from '../../models/categoria';

import { TarjetaComponent } from '../../shared/tarjeta/tarjeta';

@Component({
  selector: 'app-categorias',
  imports: [CommonModule, RouterLink, TarjetaComponent],
  templateUrl: './categorias.html',
  styleUrl: './categorias.css',
})
export class Categorias implements OnInit {
  categorias: Categoria[] = [];
  productos: Producto[] = [];
  categoriasExpandidas: number[] = [];
  categoriaSeleccionadaId?: number;

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private categoriasService: CategoriasService,
  ) {}

  ngOnInit(): void {
    this.cargarCategorias();

    this.route.params.subscribe((params) => {
      const id = params['id'];
      const url = this.route.snapshot.url.map((segment) => segment.path).join('/');

      if (url.includes('ofertas')) {
        this.cargarOfertas();
      } else if (url.includes('destacados')) {
        this.cargarDestacados();
      } else if (id && !isNaN(Number(id))) {
        this.categoriaSeleccionadaId = +id;
        this.cargarProductos(+id);
      }
    });
  }

  cargarCategorias() {
    this.categoriasService.getCategorias().subscribe({
      next: (data) => {
        this.categorias = data.filter((categoria) => categoria.parent == null && categoria.activo);
      },
      error: (err) => console.error(err),
    });
  }

  cargarOfertas() {
    this.productoService.getOfertas().subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (err) => console.error(err),
    });
  }

  cargarDestacados() {
    this.productoService.getDestacados().subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (err) => console.error(err),
    });
  }

  cargarProductos(id: number) {
    this.productoService.getProductosPorCategoria(id).subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (err) => console.error(err),
    });
  }

  agregarProducto() {
    console.log('Producto añadido');
  }

  toggleCategoria(id: number) {
    if (this.categoriasExpandidas.includes(id))
      this.categoriasExpandidas = this.categoriasExpandidas.filter(
        (categoriaId) => categoriaId !== id,
      );
    else this.categoriasExpandidas.push(id);
  }
}
