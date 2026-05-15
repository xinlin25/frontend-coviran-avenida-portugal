import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TarjetaComponent } from '../../shared/tarjeta/tarjeta';
import { ProductoService } from '../../services/productos/productos.service';
import { Producto } from '../../models/producto';
import { ToastService } from '../../services/toast/toast.service';
import { CarritoService } from '../../services/carrito/carrito.service';

@Component({
  selector: 'app-detalle-prod',
  imports: [CommonModule, TarjetaComponent, RouterLink],
  templateUrl: './detalle-prod.html',
  styleUrl: './detalle-prod.css',
})
export class DetalleProd implements OnInit {
  producto?: Producto;
  productosRelacionados: Producto[] = [];

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private carritoService: CarritoService,
    private toast: ToastService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = +params['id'];
      this.cargarProducto(id);
      this.cargarRelacionados(id, id);
    });
  }

  cargarProducto(id: number) {
    this.productoService.getProductoById(id).subscribe({
      next: (data) => {
        this.producto = data;

        if (data.categoria?.id) {
          this.cargarRelacionados(data.categoria.id, data.id);
        }
      },
      error: (err) => this.toast.error('Error al cargar el producto'),
    });
  }

  agregarProducto(productoId: number) {
    this.carritoService.agregarProducto(productoId).subscribe({
      next: () => {
        this.toast.success('Producto añadido al carrito');
      },

      error: (err) => {
        if (err.status === 401) this.toast.error('Primero debes de iniciar sesión');
      },
    });
  }

  cargarRelacionados(categoriaId: number, productoActualId: number) {
    this.productoService.getProductosPorCategoria(categoriaId).subscribe({
      next: (data) => {
        this.productosRelacionados = data.filter((p) => p.id !== productoActualId).slice(0, 4);
      },

      error: (err) => this.toast.error('Error al cargar productos relacionados'),
    });
  }
}
