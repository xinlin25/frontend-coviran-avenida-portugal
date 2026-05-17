import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ProductoService } from '../../services/productos/productos.service';
import { ToastService } from '../../services/toast/toast.service';
import { CategoriasService } from '../../services/categorias/categorias.service';
import { CarritoService } from '../../services/carrito/carrito.service';

import { Producto } from '../../models/producto';
import { Categoria } from '../../models/categoria';

import { TarjetaComponent } from '../../shared/tarjeta/tarjeta';

@Component({
  selector: 'app-categorias-contenido',
  standalone: true,
  imports: [CommonModule, TarjetaComponent],
  templateUrl: './categorias-contenido.html',
  styleUrls: ['./categorias-contenido.css'],
})
export class CategoriasContenido implements OnInit {
  productos: Producto[] = [];
  tituloPagina: string = '';
  subtituloPagina: string = '';
  categoriaSeleccionadaId?: number;
  paginaActual = 1;
  elementosPorPagina = 12;

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private categoriasService: CategoriasService,
    private carritoService: CarritoService,
    private toast: ToastService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      const url = this.route.snapshot.url.map((segment) => segment.path).join('/');

      // /categorias
      if (!id && url === '') {
        this.tituloPagina = 'Ofertas';
        this.subtituloPagina = '';
        this.cargarOfertas();
        return;
      }

      // ofertas
      if (url.includes('ofertas')) {
        this.tituloPagina = 'Ofertas';
        this.subtituloPagina = '';
        this.cargarOfertas();
        return;
      }

      // destacados
      if (url.includes('destacados')) {
        this.tituloPagina = 'Destacados';
        this.subtituloPagina = '';
        this.cargarDestacados();
        return;
      }

      // categoria
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

  agregarProducto(productoId: number) {
    this.carritoService.agregarProducto(productoId).subscribe({
      next: () => {
        this.toast.success('Producto añadido al carrito');
      },

      error: (err) => {
        console.error(err);
        if (err.status === 401) this.toast.error('Primero debes de iniciar sesión');
      },
    });
  }

  get productosPaginados(): Producto[] {
    const inicio = (this.paginaActual - 1) * this.elementosPorPagina;
    const fin = inicio + this.elementosPorPagina;
    return this.productos.slice(inicio, fin);
  }

  get totalPaginas(): number {
    return Math.ceil(this.productos.length / this.elementosPorPagina);
  }
}
