import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ProductoService } from '../../services/productos/productos.service';
import { CategoriasService } from '../../services/categorias/categorias.service';

import { Producto } from '../../models/producto';
import { Categoria } from '../../models/categoria';

import { TarjetaComponent } from '../../shared/tarjeta/tarjeta';
import { Menu } from '../../shared/menu/menu';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, TarjetaComponent, Menu],
  templateUrl: './categorias.html',
  styleUrls: ['./categorias.css'],
})
export class Categorias implements OnInit {
  productos: Producto[] = [];

  tituloPagina: string = '';

  subtituloPagina: string = '';

  categoriaSeleccionadaId?: number;

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private categoriasService: CategoriasService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      const url = this.route.snapshot.url.map((segment) => segment.path).join('/');

      // /categorias
      if (!id && url === 'categorias') {
        this.tituloPagina = 'Ofertas';

        this.subtituloPagina = '';

        this.cargarOfertas();

        return;
      }

      // /categorias/ofertas
      if (url.includes('ofertas')) {
        this.tituloPagina = 'Ofertas';
        this.subtituloPagina = '';
        this.cargarOfertas();

        return;
      }

      // /categorias/destacados
      if (url.includes('destacados')) {
        this.tituloPagina = 'Destacados';
        this.subtituloPagina = '';
        this.cargarDestacados();

        return;
      }

      // /categorias/:id
      if (id && !isNaN(Number(id))) {
        this.categoriaSeleccionadaId = +id;

        this.categoriasService.getCategoriaPorId(+id).subscribe({
          next: (categoria: Categoria) => {
            if (categoria.parent) {
              this.tituloPagina = categoria.parent.nombre;
              this.subtituloPagina = categoria.nombre;
            } else {
              this.tituloPagina = categoria.nombre;
              this.subtituloPagina = '';
            }
          },

          error: (err) => console.error(err),
        });

        this.cargarProductos(+id);
      }
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
}
